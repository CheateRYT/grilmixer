import { OnModuleInit } from '@nestjs/common'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { PrismaService } from 'src/prisma.service'

@WebSocketGateway({
	cors: {
		origin: '*'
	}
})
export class GatewayService implements OnModuleInit {
	@WebSocketServer()
	server: Server

	constructor(private prisma: PrismaService) {}

	async onModuleInit() {
		this.server.on('connection', async socket => {
			const token = socket.handshake.auth.token
			if (!token) {
				socket.disconnect()
			}

			const isAdmin = await this.checkAdminToken(token)
			if (!isAdmin) {
				socket.disconnect()
			} else {
			}
		})
	}

	async sendOrderCreatedEvent(orderData: number) {
		this.server.emit('orderCreated', { msg: 'Новый заказ', content: orderData })
	}
	async sendOrderPaymentSuccess(orderData: number) {
		console.log(`Заказ оплачен ${orderData}`)
		this.server.emit('orderPaymentSuccess', {
			msg: 'Заказ оплачен',
			content: orderData
		})
	}
	async checkAdminToken(token: string): Promise<boolean> {
		const admin = await this.prisma.admin.findFirst({
			where: {
				token: token
			}
		})
		return !!admin
	}

	// @SubscribeMessage('newMessage')
	// onNewMessage(@MessageBody() data: any) {
	// 	this.server.emit('onMessage', {
	// 		msg: 'new Message',
	// 		content: data
	// 	})
	// 	console.log(data)
	// }
}
