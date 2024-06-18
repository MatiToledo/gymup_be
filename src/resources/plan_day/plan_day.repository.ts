import { Inject, Injectable } from '@nestjs/common';
import { PLAN_DAY_REPOSITORY } from './../../common/constants';
import { IPlanDayRepository } from './plan_day.interface';
import { PlanDay } from './entities/plan_day.entity';

@Injectable()
export class PlanDayRepository implements IPlanDayRepository {
  constructor(
    @Inject(PLAN_DAY_REPOSITORY)
    private planDayModel: typeof PlanDay,
  ) {}

  async findAll(): Promise<PlanDay[]> {
    return this.planDayModel.findAll();
  }
}
