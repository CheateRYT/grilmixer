import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class EventService {
	constructor(private prisma: PrismaService) {}

	async getEvents(shopId: number) {
		return this.prisma.event.findMany({
			where: {
				shopId: Number(shopId)
			}
		})
	}
}
