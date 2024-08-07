import { Body, Controller, Post } from '@nestjs/common'
import { OrderDto } from 'src/dto/order.dto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post('createOrder')
	async createOrder(@Body() orderData: OrderDto) {
		try {
			const newOrder = await this.orderService.createOrder(orderData)
			return { message: 'Заказ успешно создан', order: newOrder }
		} catch (error) {
			return { error: 'Ошибка при создании заказа', details: error.message }
		}
	}
}
