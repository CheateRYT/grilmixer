import { Controller } from '@nestjs/common'
import { OtherCafeService } from './other-cafe.service'

@Controller('otherCafe')
export class OtherCafeController {
	constructor(private readonly otherCafeService: OtherCafeService) {}
}
