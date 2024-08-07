import { IsNumber, IsString } from 'class-validator'

export class EventDto {
	@IsNumber()
	shopId: number
	@IsString()
	text: string
	@IsString()
	imagePath: string
}
