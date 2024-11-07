import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { OrderDto } from 'src/dto/order.dto'
import { GatewayService } from 'src/gateway.module.ts/gateway.service'
import { PrismaService } from 'src/prisma.service'
import * as YooKassa from 'yookassa'

export const yookassa = new YooKassa({
	shopId: process.env['SHOP_ID'],
	secretKey: process.env['YOOKASSA_TOKEN']
})

@Injectable()
export class OrderService {
	constructor(
		private prisma: PrismaService,
		private gatewayService: GatewayService
	) {}

	async createOrder(orderData: OrderDto) {
		try {
			const products = await this.prisma.product.findMany({
				where: {
					id: {
						in: orderData.products
					}
				}
			})

			const unavailableProducts = products.filter(
				product => !product.isAvailable || product.isStopList
			)
			if (unavailableProducts.length > 0) {
				throw new HttpException(
					'Один или несколько товаров не доступны для заказа',
					HttpStatus.BAD_REQUEST
				)
			}

			let totalAmount = 0 // Общая сумма заказа
			const receiptItems = []

			// Группируем заказы по продуктам и их дополнительным ингредиентам
			const groupedOrders = new Map<
				string,
				{ productId: number; productCount: number; extraIngredients: string }
			>()

			for (let i = 0; i < orderData.extraIngredientsOrder.length; i++) {
				const extraIngredientsOrder = orderData.extraIngredientsOrder[i]
				const productId = extraIngredientsOrder.productId
				const productCount = extraIngredientsOrder.productCount
				const extraIngredients = extraIngredientsOrder.extraIngredients

				const key = `${productId}-${extraIngredients}` // Уникальный ключ для группировки

				if (groupedOrders.has(key)) {
					const existingOrder = groupedOrders.get(key)
					existingOrder.productCount += productCount // Увеличиваем количество
				} else {
					groupedOrders.set(key, {
						productId,
						productCount,
						extraIngredients
					})
				}
			}

			// Обрабатываем все сгруппированные продукты в заказе
			for (const order of groupedOrders.values()) {
				const product = products.find(p => p.id === order.productId)
				const productCount = order.productCount
				let extraIngredientsCost = 0

				// Проверяем наличие дополнительных ингредиентов
				const extraIngredientIds = order.extraIngredients
					.split(',')
					.map(id => parseInt(id))
					.filter(id => !isNaN(id)) // Фильтруем нечисловые значения

				if (extraIngredientIds.length > 0) {
					const extraIngredients = await this.prisma.extraIngredient.findMany({
						where: {
							id: {
								in: extraIngredientIds
							}
						}
					})
					// Рассчитываем стоимость дополнительных ингредиентов с учетом количества
					extraIngredientsCost = extraIngredients.reduce(
						(sum, ingredient) => sum + Number(ingredient.price) * productCount,
						0
					)
				}

				// Рассчитываем общую стоимость для текущего продукта с учетом дополнительных ингредиентов
				const productTotalPrice =
					(Number(product.price) - Number(product.discount)) * productCount +
					extraIngredientsCost

				// Добавляем информацию о продукте в чек
				receiptItems.push({
					description: product.name,
					quantity: productCount,
					payment_subject: 'commodity',
					amount: { value: productTotalPrice.toFixed(2), currency: 'RUB' },
					vat_code: 1,
					measure: 'piece'
				})

				// Добавляем стоимость текущего продукта к общей сумме
				totalAmount += productTotalPrice

				// Сохраняем дополнительные ингредиенты, если они есть
				await this.prisma.extraIngredientOrder.create({
					data: {
						productId: product.id,
						extraIngredients: order.extraIngredients,
						productCount: order.productCount
					}
				})
			}

			// Учитываем стоимость доставки только если тип заказа "Доставка"
			if (orderData.type === 'Доставка') {
				const deliveryPrice = 300
				totalAmount += deliveryPrice
			}

			const newOrder = await this.prisma.order.create({
				data: {
					ip: orderData.ip,
					type: orderData.type,
					personCount: orderData.personCount,
					changeFrom: orderData.changeFrom || '',
					createdTime: orderData.createdTime,
					paymentType: orderData.paymentType,
					shopId: orderData.shopId,
					amount: totalAmount.toFixed(2).toString(),
					deliveryAddress: orderData.deliveryAddress || '',
					phoneNumber: orderData.phoneNumber,
					email: orderData.email || '',
					clientName: orderData.clientName,
					productsCount: orderData.productsCount.join(','),
					products: {
						connect: products.map(product => ({ id: product.id }))
					},
					extraIngredientsOrder: {
						create: Array.from(groupedOrders.values()).map(
							extraIngredientOrder => ({
								productId: extraIngredientOrder.productId,
								extraIngredients: extraIngredientOrder.extraIngredients,
								productCount: extraIngredientOrder.productCount
							})
						)
					}
				},
				include: {
					products: true,
					extraIngredientsOrder: true
				}
			})

			await this.prisma.notification.create({
				data: {
					shopId: newOrder.shopId,
					orderId: newOrder.id
				}
			})

			this.gatewayService.sendOrderCreatedEvent(newOrder.id)

			// Проверяем тип заказа и тип оплаты
			if (
				orderData.type === 'Самовывоз' &&
				orderData.paymentType === 'Наличные'
			) {
				// Если Самовывоз и Наличные, не создаем платеж через YooKassa
				return newOrder // Возвращаем заказ без создания платежа
			}

			const returnUrl = `http://109.205.58.24:5173/${orderData.shopTag}/thanks/${newOrder.id}`
			const payment = await yookassa.createPayment({
				amount: { value: totalAmount.toFixed(2).toString(), currency: 'RUB' },
				confirmation: {
					type: 'redirect',
					locale: 'ru_RU',
					return_url: returnUrl
				},
				description: `Магазин ${orderData.shopName}. Заказ №` + newOrder.id,
				metadata: {
					order_id: newOrder.id
				},
				receipt: {
					customer: {
						email: orderData.email
					},
					items: receiptItems
				}
			})

			return [newOrder, payment]
		} catch (error) {
			throw new HttpException(
				'Ошибка создания заказа: ' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
}
