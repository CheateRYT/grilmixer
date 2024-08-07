import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { GatewayService } from './gateway.service'

@Module({
	providers: [GatewayService, PrismaService]
})
export class GatewayModule {}
