import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class AdminLoginDto {
	@IsNotEmpty()
	@IsString()
	login: string
	@IsOptional()
	@IsString()
	password: string
}
