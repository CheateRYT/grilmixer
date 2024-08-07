import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class ExtraIngredientDto {
	@IsOptional()
	@IsNumber()
	id: number

	@IsOptional()
	@IsNumber()
	shopId: number
	@IsOptional()
	@IsString()
	category: string

	@IsOptional()
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	price: string

	@IsOptional()
	@IsBoolean()
	isAvailable: boolean

	@IsOptional()
	@IsString()
	categoryTag: string
}
