import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { OrderDto } from '../dto/order.dto'
import { AdminService } from './admin.service'
import { AdminLoginDto } from './dto/Admin-Login.dto'
import { CategoryDto } from './dto/category.dto'
import { EventDto } from './dto/event.dto'
import { ExtraIngredientDto } from './dto/extraIngredients.dto'
import { PaymentStatusDto } from './dto/payment-status.dto'
import { ProductDto } from './dto/product.dto'

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post('login')
	@UsePipes(new ValidationPipe())
	async login(@Body() dto: AdminLoginDto): Promise<{ token: string }> {
		const token = await this.adminService.login(dto)
		return { token }
	}

	@Get('')
	async verify(
		@Headers('authorization') authorization: string
	): Promise<{ valid: boolean }> {
		const token = authorization.replace('Bearer ', '')
		const isValid = await this.adminService.verifyToken(token)
		return { valid: isValid }
	}

	private async isAdmin(authorization: string) {
		const token = authorization.replace('Bearer ', '')
		const isValid = await this.adminService.verifyToken(token)
		if (!isValid) {
			throw new HttpException('Вы не администратор!!!', HttpStatus.FORBIDDEN)
		}
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('createProduct')
	async createProduct(
		@Headers('authorization') authorization: string,
		@Body() dto: ProductDto
	) {
		try {
			await this.isAdmin(authorization)
			await this.adminService.createProduct(dto)
			return { message: 'Продукт успешно создан' }
		} catch (error) {
			throw new HttpException(
				`Ошибка при создании продукта ошибка - ${error}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	@HttpCode(200)
	@Delete('deleteProduct/:productId')
	async deleteProduct(
		@Headers('authorization') authorization: string,
		@Param('productId') productId: number
	) {
		try {
			await this.isAdmin(authorization)
			await this.adminService.deleteProduct(productId)
			return { message: 'Продукт успешно удален' }
		} catch (error) {
			throw new HttpException(
				'Ошибка при удалении продукта' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('updateOrder/:orderId')
	async updateOrder(
		@Headers('authorization') authorization: string,
		@Param('orderId') orderId: number,
		@Body() dto: OrderDto
	) {
		try {
			await this.isAdmin(authorization)
			await this.adminService.updateOrder(orderId, dto)
			return { message: 'Заказ успешно обновлен' }
		} catch (error) {
			throw new HttpException(
				'Ошибка при обновлении заказа' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	@HttpCode(200)
	@Get('getPaymentOrders')
	async getPaymentOrders(
		@Headers('authorization') authorization: string
	): Promise<any> {
		try {
			await this.isAdmin(authorization)
			return await this.adminService.getPaymentOrders()
		} catch (error) {
			throw new HttpException(
				'Ошибка при получении оплаченных заказов',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('updateProduct/:productId')
	async updateProduct(
		@Headers('authorization') authorization: string,
		@Param('productId') productId: number,
		@Body() dto: ProductDto
	) {
		try {
			await this.isAdmin(authorization)
			await this.adminService.updateProduct(productId, dto)
			return { message: 'Продукт успешно обновлен' }
		} catch (error) {
			throw new HttpException(
				'Ошибка при обновлении продукта' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	@HttpCode(200)
	@Get('getProducts/:shopId')
	async getProducts(@Param('shopId') shopId: number): Promise<ProductDto[]> {
		try {
			return await this.adminService.getProducts(shopId)
		} catch (error) {
			throw new HttpException(
				'Ошибка при получении продуктов',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	@HttpCode(200)
	@Get('getProducts/:shopId/:category')
	async getProductsByCategory(
		@Param('shopId') shopId: number,
		@Param('category') category: string
	): Promise<ProductDto[]> {
		try {
			return await this.adminService.getProductsByCategory(shopId, category)
		} catch (error) {
			throw new HttpException(
				'Ошибка при получении продуктов по категории',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	@HttpCode(200)
	@Get('getOrders/:page')
	async getOrders(
		@Headers('authorization') authorization: string,
		@Param('page') page: number
	) {
		try {
			await this.isAdmin(authorization)
			return await this.adminService.getOrders(page)
		} catch (error) {
			throw new HttpException(
				'Ошибка при получении заказов',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	@UsePipes(new ValidationPipe())
	@Post('event')
	async createEvent(
		@Headers('authorization') authorization: string,
		@Body() eventDto: EventDto
	) {
		await this.isAdmin(authorization)
		return this.adminService.createEvent(eventDto)
	}

	@Delete('event/:id')
	async deleteEvent(
		@Headers('authorization') authorization: string,
		@Param('id') id: string
	) {
		await this.isAdmin(authorization)
		return this.adminService.deleteEvent(parseInt(id, 10))
	}
	@HttpCode(200)
	@Get('notifications')
	async getNotifications(
		@Headers('authorization') authorization: string
	): Promise<{ id: number; orderId: number }[]> {
		try {
			await this.isAdmin(authorization)
			return await this.adminService.getNotifications()
		} catch (error) {
			throw new HttpException(
				'Ошибка при получении уведомлений',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	@HttpCode(200)
	@Get('notifications/count')
	async getNotificationsCount(
		@Headers('authorization') authorization: string
	): Promise<number> {
		try {
			await this.isAdmin(authorization)
			return await this.adminService.getNotificationsCount()
		} catch (error) {
			throw new HttpException(
				'Ошибка при получении количества уведомлений',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
	@Delete('notifications/:id')
	async readNotification(
		@Headers('authorization') authorization: string,
		@Param('id') id: string
	) {
		await this.isAdmin(authorization)
		return this.adminService.readNotification(parseInt(id, 10))
	}
	@HttpCode(200)
	@Post('paymentOrder/confirm')
	async paymentOrderConfirm(@Body() payment: PaymentStatusDto) {
		return this.adminService.paymentOrderConfirm(payment)
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('createCategory')
	async createCategory(
		@Headers('authorization') authorization: string,
		@Body() dto: CategoryDto
	) {
		try {
			await this.isAdmin(authorization)
			await this.adminService.createCategory(dto)
			return { message: 'Категория успешно создана' }
		} catch (error) {
			throw new HttpException(
				'Ошибка при создании категории',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@HttpCode(200)
	@Delete('deleteCategory/:categoryId')
	async deleteCategory(
		@Headers('authorization') authorization: string,
		@Param('categoryId') categoryId: number
	) {
		try {
			await this.isAdmin(authorization)
			await this.adminService.deleteCategory(categoryId)
			return { message: 'Категория успешно удалена' }
		} catch (error) {
			throw new HttpException(
				'Ошибка при удалении категории' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@HttpCode(200)
	@Get('getCategories/:shopId')
	async getCategories(@Param('shopId') shopId: number): Promise<
		{
			id: number
			shopId: number
			name: string
			tag: string
			imagePath: string
		}[]
	> {
		try {
			return await this.adminService.getCategories(shopId)
		} catch (error) {
			throw new HttpException(
				'Ошибка при получении категорий',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('extraIngredient')
	async createExtraIngredient(
		@Headers('authorization') authorization: string,
		@Body() dto: ExtraIngredientDto
	) {
		try {
			await this.isAdmin(authorization)
			await this.adminService.createExtraIngredient(dto)
			return { message: 'Дополнительный ингредиент успешно создан' }
		} catch (error) {
			throw new HttpException(
				`Ошибка при создании дополнительного ингредиента: ${error}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@HttpCode(200)
	@Delete('extraIngredient/delete/:id')
	async deleteExtraIngredient(
		@Headers('authorization') authorization: string,
		@Param('id') id: number
	) {
		try {
			await this.isAdmin(authorization)
			await this.adminService.deleteExtraIngredient(id)
			return { message: 'Дополнительный ингредиент успешно удален' }
		} catch (error) {
			throw new HttpException(
				`Ошибка при удалении дополнительного ингредиента: ${error}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@HttpCode(200)
	@Get('extraIngredients/:shopId/:categoryTag')
	async getExtraIngredients(
		@Param('shopId') shopId: number,
		@Param('categoryTag') categoryTag: string
	) {
		try {
			return await this.adminService.getExtraIngredients(shopId, categoryTag)
		} catch (error) {
			throw new HttpException(
				'Ошибка при получении дополнительных ингредиентов' + error,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
}
