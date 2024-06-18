import { Controller, Get } from '@nestjs/common';
import { PlanDayService } from './plan_day.service';

@Controller('plan-day')
export class PlanDayController {
  constructor(private readonly planDayService: PlanDayService) {}

  @Get()
  findAll() {
    return this.planDayService.findAll();
  }
}
