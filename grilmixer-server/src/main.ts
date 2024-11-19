import { NestFactory } from '@nestjs/core'
import * as fs from 'fs' // Импортируем модуль fs
import { AppModule } from './app.module'

async function bootstrap() {
	const httpsOptions = {
		key: fs.readFileSync('./src/serts/privkey.pem'),
		cert: fs.readFileSync('./src/serts/fullchain.pem')
	}
	const app = await NestFactory.create(AppModule, { httpsOptions })
	app.setGlobalPrefix('api')
	app.enableCors()
	await app.listen(4200)
}
bootstrap()
