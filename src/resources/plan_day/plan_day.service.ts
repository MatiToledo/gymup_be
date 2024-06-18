import { Injectable } from '@nestjs/common';
import { IPlanDayService } from './plan_day.interface';
import { PlanDayRepository } from './plan_day.repository';

@Injectable()
export class PlanDayService implements IPlanDayService {
  constructor(private readonly planDayRepository: PlanDayRepository) {}

  findAll() {
    return this.planDayRepository.findAll();
  }
}
