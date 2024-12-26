import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class OtherCafeProductDto {
	@IsOptional()
	@IsString()
	shopName: string

	@IsOptional()
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	category: string

	@IsOptional()
	@IsString()
	weight: string

	@IsOptional()
	@IsString()
	price: string
}
