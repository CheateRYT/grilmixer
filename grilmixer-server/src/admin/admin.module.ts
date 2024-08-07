import { Module } from '@nestjs/common'
import { GatewayService } from 'src/gateway.module.ts/gateway.service'
import { PrismaService } from 'src/prisma.service'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
	controllers: [AdminController],
	providers: [AdminService, PrismaService, GatewayService]
})
export class AdminModule {}
