import { Module } from '@nestjs/common';
import { OtherCafeService } from './other-cafe.service';
import { OtherCafeController } from './other-cafe.controller';

@Module({
  controllers: [OtherCafeController],
  providers: [OtherCafeService],
})
export class OtherCafeModule {}
