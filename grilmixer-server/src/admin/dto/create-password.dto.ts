import { IsOptional } from 'class-validator'

export class CreatePasswordDto {
	@IsOptional()
	password: string
	@IsOptional()
	lastPassword: string
}
