import { Module } from '@nestjs/common'
import { GatewayService } from 'src/gateway.module.ts/gateway.service'
import { PrismaService } from 'src/prisma.service'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
	controllers: [OrderController],
	providers: [OrderService, PrismaService, GatewayService]
})
export class OrderModule {}
