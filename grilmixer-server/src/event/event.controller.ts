import { Controller, Get, Param } from '@nestjs/common'
import { EventService } from './event.service'

@Controller('events')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get(':shopId')
	async getAllEvents(@Param('shopId') shopId: number) {
		return this.eventService.getEvents(shopId)
	}
}
