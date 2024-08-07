import { IsNumber, IsString } from 'class-validator'

export class CategoryDto {
	@IsNumber()
	shopId: number
	@IsString()
	name: string
	@IsString()
	tag: string
	@IsString()
	imagePath: string
}
