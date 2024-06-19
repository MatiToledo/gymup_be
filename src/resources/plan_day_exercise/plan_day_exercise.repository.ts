import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PLAN_DAY_EXERCISE_REPOSITORY } from '../../common/constants';
import { PlanDayExercise } from './entities/plan_day_exercise.entity';
import { IPlanDayExerciseRepository } from './plan_day_exercise.interface';

@Injectable()
export class PlanDayExerciseRepository implements IPlanDayExerciseRepository {
  constructor(
    @Inject(PLAN_DAY_EXERCISE_REPOSITORY)
    private planDayExerciseModel: typeof PlanDayExercise,
  ) {}

  async bulkCreate(data: Partial<PlanDayExercise>[]) {
    try {
      return this.planDayExerciseModel.bulkCreate(data);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while creating the plan days exercises',
      );
    }
  }

  async findAll(): Promise<PlanDayExercise[]> {
    try {
      return this.planDayExerciseModel.findAll();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while fetching the plan days exercises',
      );
    }
  }
}
