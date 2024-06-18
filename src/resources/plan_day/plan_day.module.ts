import { Module } from '@nestjs/common';
import { PlanDayService } from './plan_day.service';
import { PlanDayController } from './plan_day.controller';
import { PlanDayRepository } from './plan_day.repository';
import { planDaysProviders } from './entities/plan_day.entity';

@Module({
  controllers: [PlanDayController],
  providers: [PlanDayService, PlanDayRepository, ...planDaysProviders],
  exports: [PlanDayService, PlanDayRepository],
})
export class PlanDayModule {}
