// @ts-nocheck
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { hash, verify } from 'argon2'
import { GatewayService } from 'src/gateway.module.ts/gateway.service'
import { yookassa } from 'src/order/order.service'
import { PrismaService } from 'src/prisma.service'
import { v4 as uuidv4 } from 'uuid'
import { OrderDto } from '../dto/order.dto'
import { AdminLoginDto } from './dto/admin-login.dto'
import { CategoryDto } from './dto/category.dto'
import { EventDto } from './dto/event.dto'
import { ExtraIngredientDto } from './dto/extraIngredients.dto'
import { PaymentStatusDto } from './dto/payment-status.dto'
import { ProductDto } from './dto/product.dto'
@Injectable()
export class AdminService {
	constructor(
		private readonly prisma: PrismaService,
		private gatewayService: GatewayService
	) {}

	async login(dto: AdminLoginDto): Promise<string> {
		const admin = await this.prisma.admin.findUnique({
			where: { login: dto.login }
		})
		let passwordMatch: boolean
		if (!admin) {
			throw new HttpException('Неправильные данные', HttpStatus.UNAUTHORIZED)
		}
		if (!dto.password && !admin.password) {
			passwordMatch = true
		} else {
			passwordMatch = await verify(admin.password, dto.password)
		}

		if (!passwordMatch) {
			throw new HttpException('Неправильные данные', HttpStatus.UNAUTHORIZED)
		}

		const token = uuidv4()
		await this.prisma.admin.update({
			where: { id: admin.id },
			data: { token }
		})
		return token
	}

	async verifyToken(token: string): Promise<boolean> {
		const admin = await this.prisma.admin.findFirst({
			where: {
				token
			}
		})

		return !!admin
	}
	async getOrders(page: number): Promise<any> {
		const perPage = 10 // Количество заказов на одной странице
		const skip = (page - 1) * perPage // Пропустить заказы на предыдущих страницах

		const orders = await this.prisma.order.findMany({
			take: perPage, // Взять определенное количество заказов
			skip: skip, // Пропустить предыдущие заказы
			include: {
				products: {
					select: {
						id: true,
						name: true
					}
				},
				extraIngredientsOrder: {
					select: {
						productId: true,
						productCount: true,
						extraIngredients: true
					}
				}
			}
		})

		const totalOrders = await this.prisma.order.count() // Общее количество заказов

		return {
			orders,
			totalOrders,
			currentPage: page,
			totalPages: Math.ceil(totalOrders / perPage) // Общее количество страниц
		}
	}
	async getProducts(shopId: number) {
		return this.prisma.product.findMany({
			where: {
				shopId: Number(shopId)
			}
		})
	}
	async getOrderThanks(orderId: number, ip: string) {
		return this.prisma.order.findFirst({
			where: {
				id: Number(orderId),
				ip
			},
			select: {
				id: true,
				shopId: true,
				type: true,
				paymentType: true,
				amount: true,
				status: true,
				createdTime: true,
				completedTime: true,
				deliveryAddress: true
			}
		})
	}
	async createProduct(dto: ProductDto) {
		try {
			const productData = {
				shopId: dto.shopId,
				category: dto.category,
				bzu: dto.bzu,
				name: dto.name,
				ingredients: dto.ingredients,
				weight: dto.weight,
				price: dto.price,
				discount: dto.discount,
				imagePath:
					dto.imagePath ||
					'https://lh3.googleusercontent.com/pw/AP1GczOf-hwrt20joidRy5-FsFmzIPPg_98EMZY2Ll1n4Vdw9UQiMfFzbGw3FY7KXpwbX2f0PfPSDKne4w44hF1KWKyPmOQ7t5xgMuPuABfpRcqm-fLjapklzVxmjMg2bEbehTFHt44Mmk28F9Oo2pBZL2vS=w211-h156-s-no-gm?authuser=0',
				isStopList: dto.isStopList,
				isAvailable: dto.isAvailable
			}
			return this.prisma.product.create({ data: productData })
		} catch (error) {
			throw new HttpException(
				`Ошибка при создании продукта ошибкаS - ${error}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async updateProduct(productId: number, dto: ProductDto) {
		try {
			const data: {
				shopId: number
				category: string
				bzu: string
				name: string
				ingredients: string
				weight: string
				price: string
				imagePath: string
				isStopList: boolean
				discount: string
				isAvailable: boolean
			} = {}
			if (dto.shopId) data.shopId = dto.shopId
			if (dto.category) data.category = dto.category
			if (dto.bzu) data.bzu = dto.bzu
			if (dto.name) data.name = dto.name
			if (dto.ingredients) data.ingredients = dto.ingredients
			if (dto.weight) data.weight = dto.weight
			if (dto.price) data.price = dto.price
			if (dto.discount !== undefined) data.discount = dto.discount
			if (dto.imagePath) data.imagePath = dto.imagePath
			if (dto.isStopList !== undefined) data.isStopList = dto.isStopList
			if (dto.isAvailable !== undefined) data.isAvailable = dto.isAvailable

			await this.prisma.product.update({
				where: { id: Number(productId) },
				data: data
			})

			return { message: 'Продукт успешно обновлен' }
		} catch (error) {
			throw new HttpException(
				'Ошибка при обновлении продукта' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async deleteProduct(productId: number) {
		return this.prisma.product.delete({
			where: { id: Number(productId) }
		})
	}
	async createPassword(lastPassword: string, token: string, password: string) {
		const admin = await this.prisma.admin.findUnique({
			where: { token }
		})

		if (!admin) {
			throw new HttpException('Администратор не найден', HttpStatus.NOT_FOUND)
		}

		if (lastPassword && admin.password) {
			if (!verify(lastPassword, admin.password)) {
				throw new HttpException(
					'Вы ввели неправильный пароль',
					HttpStatus.FORBIDDEN
				)
			}
		}

		const hashedPassword = await hash(password) // Хэшируем новый пароль

		await this.prisma.admin.update({
			where: { id: admin.id },
			data: { password: hashedPassword }
		})

		return { message: 'Пароль успешно установлен' }
	}
	async updateOrder(orderId: number, dto: OrderDto) {
		try {
			const data: {
				amount: string
				clientName: string
				status: string
				completedTime: string | Date
			} = {}
			if (dto.amount) data.amount = dto.amount
			if (dto.clientName) data.clientName = dto.clientName
			if (dto.status) {
				data.status = dto.status
				if (dto.status === 'Доставлен') {
					data.completedTime = new Date() // Устанавливаем текущее время как время завершения заказа
				}
			}
			await this.prisma.order.update({
				where: { id: Number(orderId) },
				data: data
			})
			return { message: 'Заказ успешно обновлен' }
		} catch (error) {
			throw new HttpException(
				'Ошибка при обновлении заказа' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async createEvent(eventDto: EventDto) {
		try {
			await this.prisma.event.create({
				data: {
					shopId: eventDto.shopId,
					text: eventDto.text,
					imagePath: eventDto.imagePath
				}
			})
		} catch (error) {
			throw new HttpException(
				'Ошибка при создании акции' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async deleteEvent(eventId: number) {
		try {
			await this.prisma.event.delete({
				where: {
					id: Number(eventId)
				}
			})
		} catch (error) {
			throw new HttpException(
				'Ошибка при удалении акции' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async getNotificationsCount() {
		try {
			const count = await this.prisma.notification.count()
			return count
		} catch (error) {
			throw new HttpException(
				'Ошибка при получении количества уведомлений' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	async getProductsByCategory(shopId: number, category: string) {
		return this.prisma.product.findMany({
			where: {
				category,
				isAvailable: true, // Продукты должны быть доступны
				isStopList: false, // Продукты не должны быть в стоп-листе
				shopId: Number(shopId)
			}
		})
	}
	async getNotifications() {
		try {
			return this.prisma.notification.findMany()
		} catch (error) {
			throw new HttpException(
				'Ошибка при получении уведомлений' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async readNotification(notificationNumber: number) {
		try {
			await this.prisma.notification.delete({
				where: { id: Number(notificationNumber) }
			})
		} catch (error) {
			throw new HttpException(
				'Ошибка при прочитывании уведомления' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	async getPaymentOrders(): Promise<any> {
		const orders = await this.prisma.order.findMany({
			where: {
				NOT: [{ status: 'Новый' }, { status: 'Завершен' }]
			},
			include: {
				products: {
					select: {
						id: true,
						name: true
					}
				}
			}
		})
		return orders
	}
	async paymentOrderConfirm(dto: PaymentStatusDto) {
		try {
			const payment = await yookassa.capturePayment(
				dto.object.id,
				dto.object.amount
			)

			const orderId = parseInt(dto.object.metadata.order_id)
			await this.prisma.order.update({
				where: { id: orderId },
				data: { status: 'Оплачен' }
			})
			this.gatewayService.sendOrderPaymentSuccess(orderId)
			console.log(dto)
			console.error(dto)
			return payment
		} catch (e) {
			throw new HttpException(
				'Ошибка при подтверждении платежа' + e,
				HttpStatus.BAD_REQUEST
			)
		}
	}

	async createCategory(dto: CategoryDto) {
		try {
			const categoryData = {
				shopId: dto.shopId,
				name: dto.name,
				tag: dto.tag,
				imagePath: dto.imagePath
			}
			return await this.prisma.category.create({ data: categoryData })
		} catch (error) {
			throw new HttpException(
				'Ошибка при создании категории',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async deleteCategory(categoryId: number) {
		return await this.prisma.category.delete({
			where: { id: Number(categoryId) }
		})
	}

	async getCategories(shopId: number) {
		return await this.prisma.category.findMany({
			where: {
				shopId: Number(shopId)
			}
		})
	}

	async createExtraIngredient(dto: ExtraIngredientDto) {
		try {
			const extraIngredientData = {
				shopId: dto.shopId,
				name: dto.name,
				price: dto.price,
				isAvailable: dto.isAvailable ?? true,
				categoryTag: dto.categoryTag
			}
			return await this.prisma.extraIngredient.create({
				data: extraIngredientData
			})
		} catch (error) {
			throw new HttpException(
				'Ошибка при создании дополнительного ингредиента' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async deleteExtraIngredient(id: number) {
		try {
			await this.prisma.extraIngredient.delete({ where: { id: Number(id) } })
		} catch (error) {
			throw new HttpException(
				'Ошибка при удалении дополнительного ингредиента' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async getExtraIngredients(shopId: number, categoryTag: string) {
		return await this.prisma.extraIngredient.findMany({
			where: {
				shopId: Number(shopId),
				isAvailable: true, // Добавляем фильтр на доступность
				categoryTag: categoryTag
			}
		})
	}
	async getExtraIngredient(id: number) {
		return await this.prisma.extraIngredient.findFirst({
			where: {
				id: Number(id)
			}
		})
	}
	async applyDiscountToCategory(category: string, discountPercentage: number) {
		try {
			// Получаем все продукты из указанной категории
			const products = await this.prisma.product.findMany({
				where: {
					category,
					isAvailable: true, // Убедитесь, что продукты доступны
					isStopList: false // Продукты не должны быть в стоп-листе
				}
			})

			// Обновляем каждый продукт, устанавливая новую скидку
			for (const product of products) {
				// Рассчитываем новую скидку как процент от цены
				const discountAmount =
					(parseFloat(product.price) * discountPercentage) / 100
				const newDiscount = discountAmount // Устанавливаем новую скидку

				await this.prisma.product.update({
					where: { id: product.id },
					data: { discount: newDiscount.toString() } // Присваиваем новую скидку
				})
			}

			return {
				message: 'Скидка успешно применена ко всем продуктам в категории'
			}
		} catch (error) {
			throw new HttpException(
				`Ошибка при применении скидки: ${error.message}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async removeDiscountFromCategory(category: string) {
		try {
			// Получаем все продукты из указанной категории
			const products = await this.prisma.product.findMany({
				where: {
					category,
					isAvailable: true, // Убедитесь, что продукты доступны
					isStopList: false // Продукты не должны быть в стоп-листе
				}
			})

			// Удаляем скидку для каждого продукта
			for (const product of products) {
				await this.prisma.product.update({
					where: { id: product.id },
					data: { discount: '0' } // Устанавливаем скидку в 0
				})
			}

			return {
				message: 'Скидка успешно удалена для всех продуктов в категории'
			}
		} catch (error) {
			throw new HttpException(
				`Ошибка при удалении скидки: ${error}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async getRevenueForToday(): Promise<string> {
		const startOfDay = new Date()
		startOfDay.setHours(0, 0, 0, 0)

		const endOfDay = new Date()
		endOfDay.setHours(23, 59, 59, 999)

		const orders = await this.prisma.order.findMany({
			where: {
				status: 'Оплачен',
				createdTime: {
					gte: startOfDay,
					lte: endOfDay
				}
			}
		})

		const totalRevenue = orders.reduce(
			(acc, order) => acc + parseFloat(order.amount),
			0
		)
		return totalRevenue.toFixed(2) + ' руб.'
	}

	async getRevenueForWeek(): Promise<string> {
		const startOfWeek = new Date()
		const today = new Date()
		startOfWeek.setDate(today.getDate() - today.getDay())
		startOfWeek.setHours(0, 0, 0, 0)

		const endOfWeek = new Date()
		endOfWeek.setHours(23, 59, 59, 999)

		const orders = await this.prisma.order.findMany({
			where: {
				status: 'Оплачен',
				createdTime: {
					gte: startOfWeek,
					lte: endOfWeek
				}
			}
		})

		const totalRevenue = orders.reduce(
			(acc, order) => acc + parseFloat(order.amount),
			0
		)
		return totalRevenue.toFixed(2) + ' руб.'
	}

	async getRevenueForMonth(): Promise<string> {
		const startOfMonth = new Date()
		startOfMonth.setDate(1)
		startOfMonth.setHours(0, 0, 0, 0)

		const endOfMonth = new Date()
		endOfMonth.setMonth(endOfMonth.getMonth() + 1)
		endOfMonth.setDate(0)
		endOfMonth.setHours(23, 59, 59, 999)

		const orders = await this.prisma.order.findMany({
			where: {
				status: 'Оплачен',
				createdTime: {
					gte: startOfMonth,
					lte: endOfMonth
				}
			}
		})

		const totalRevenue = orders.reduce(
			(acc, order) => acc + parseFloat(order.amount),
			0
		)
		return totalRevenue.toFixed(2) + ' руб.'
	}

	async getTotalRevenue(): Promise<string> {
		const orders = await this.prisma.order.findMany({
			where: {
				status: 'Оплачен'
			}
		})

		const totalRevenue = orders.reduce(
			(acc, order) => acc + parseFloat(order.amount),
			0
		)
		return totalRevenue.toFixed(2) + ' руб.'
	}
}
