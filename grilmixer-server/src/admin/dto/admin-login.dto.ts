import { IsNotEmpty, IsString } from 'class-validator'

export class AdminLoginDto {
	@IsNotEmpty()
	@IsString()
	login: string
	@IsNotEmpty()
	@IsString()
	password: string
}
