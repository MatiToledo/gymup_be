import { Inject, Injectable } from '@nestjs/common';
import { PLAN_REPOSITORY } from '../../common/constants';
import { Plan } from './entities/plan.entity';
import { IPlanRepository } from './plan.interface';

@Injectable()
export class PlanRepository implements IPlanRepository {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private planModel: typeof Plan,
  ) {}

  async findAll(): Promise<Plan[]> {
    return this.planModel.findAll();
  }

  async create(data: Partial<Plan>): Promise<Plan> {
    return this.planModel.create(data);
  }
}
