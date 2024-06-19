import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PLAN_DAY_REPOSITORY } from './../../common/constants';
import { IPlanDayRepository } from './plan_day.interface';
import { PlanDay } from './entities/plan_day.entity';

@Injectable()
export class PlanDayRepository implements IPlanDayRepository {
  constructor(
    @Inject(PLAN_DAY_REPOSITORY)
    private planDayModel: typeof PlanDay,
  ) {}

  async bulkCreate(data: Partial<PlanDay>[]) {
    try {
      return this.planDayModel.bulkCreate(data);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while creating the plan days',
      );
    }
  }

  async findAll(): Promise<PlanDay[]> {
    try {
      return this.planDayModel.findAll();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while fetching the plan days',
      );
    }
  }
}
