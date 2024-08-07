import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AdminModule } from './admin/admin.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventModule } from './event/event.module'
import { GatewayModule } from './gateway.module.ts/gateway.module'
import { OrderModule } from './order/order.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		GatewayModule,
		AdminModule,
		EventModule,
		OrderModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
