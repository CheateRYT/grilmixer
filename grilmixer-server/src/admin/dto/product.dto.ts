import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class ProductDto {
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
	ingredients: string

	@IsOptional()
	@IsString()
	weight: string

	@IsOptional()
	@IsString()
	price: string

	@IsOptional()
	@IsString()
	discount?: string

	@IsOptional()
	@IsString()
	imagePath: string

	@IsOptional()
	@IsBoolean()
	isStopList?: boolean

	@IsOptional()
	@IsBoolean()
	isAvailable?: boolean
}
