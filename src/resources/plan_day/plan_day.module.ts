import { Module } from '@nestjs/common';
import { PlanDayService } from './plan_day.service';
import { PlanDayController } from './plan_day.controller';

@Module({
  controllers: [PlanDayController],
  providers: [PlanDayService],
})
export class PlanDayModule {}
