import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PLAN_REPOSITORY } from '../../common/constants';
import { Plan } from './entities/plan.entity';
import { IPlanRepository } from './plan.interface';
import { UUID } from 'crypto';
import { PlanDay } from '../plan_day/entities/plan_day.entity';
import { PlanDayExercise } from '../plan_day_exercise/entities/plan_day_exercise.entity';
import { Exercise } from '../exercise/entities/exercise.entity';

@Injectable()
export class PlanRepository implements IPlanRepository {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private planModel: typeof Plan,
  ) {}

  findAll(): Promise<Plan[]> {
    return this.planModel.findAll();
  }

  create(data: Partial<Plan>): Promise<Plan> {
    return this.planModel.create(data);
  }

  findById(id: UUID): Promise<Plan> {
    try {
      const plan = this.planModel.findByPk(id, {
        include: [
          {
            model: PlanDay,
            include: [
              { model: PlanDayExercise, include: [{ model: Exercise }] },
            ],
          },
        ],
      });
      if (!plan) {
        throw new NotFoundException(`Plan with ID ${id} not found`);
      }
      return plan;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred while fetching the plan',
        );
      }
    }
  }
}
