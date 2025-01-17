import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsDate,
	IsNumber,
	IsOptional,
	IsPhoneNumber,
	IsString,
	ValidateNested
} from 'class-validator'

class ExtraIngredientOrderDto {
	@IsOptional()
	@IsNumber()
	productId: number

	@IsOptional()
	@IsNumber()
	productCount: number

	@IsOptional()
	@IsString()
	extraIngredients: string // строка с ID дополнительных ингредиентов через запятую
}
export class OrderDto {
	@IsOptional()
	@IsNumber()
	id: number
	@IsOptional()
	@IsString()
	shopTag: string
	@IsOptional()
	@IsString()
	type: string

	@IsOptional()
	@IsString()
	paymentType: string

	@IsOptional()
	@IsString()
	ip: string

	@IsOptional()
	@IsString()
	shopName: string

	@IsOptional()
	@IsNumber()
	shopId: number

	@IsOptional()
	@IsString()
	amount: string
	@IsOptional()
	@IsNumber()
	personCount: number

	@IsOptional()
	@IsString()
	changeFrom: string
	@IsOptional()
	@IsDate()
	createdTime: Date
	@IsOptional()
	@IsPhoneNumber()
	phoneNumber: string

	@IsOptional()
	@IsString()
	deliveryAddress?: string
	@IsOptional()
	@IsString()
	email?: string

	@IsOptional()
	@IsString()
	clientName: string

	@IsOptional()
	@IsDate()
	completedTime?: Date

	@IsOptional()
	@IsString()
	status: string

	@IsOptional()
	@IsNumber()
	@ArrayMinSize(1)
	products: number[]

	@IsOptional()
	@ArrayMinSize(1)
	productsCount: number[]

	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => ExtraIngredientOrderDto)
	extraIngredientsOrder?: ExtraIngredientOrderDto[]
}
