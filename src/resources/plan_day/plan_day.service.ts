import { Injectable } from '@nestjs/common';
import { IPlanDayService } from './plan_day.interface';
import { PlanDayRepository } from './plan_day.repository';
import { PlanDay } from './entities/plan_day.entity';

@Injectable()
export class PlanDayService implements IPlanDayService {
  constructor(private readonly planDayRepository: PlanDayRepository) {}

  bulkCreate(data: Partial<PlanDay>[]) {
    return this.planDayRepository.bulkCreate(data);
  }

  findAll() {
    return this.planDayRepository.findAll();
  }
}
