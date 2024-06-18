import { Inject, Injectable } from '@nestjs/common';
import { PLAN_DAY_EXERCISE_REPOSITORY } from '../../common/constants';
import { PlanDayExercise } from './entities/plan_day_exercise.entity';
import { IPlanDayExerciseRepository } from './plan_day_exercise.interface';

@Injectable()
export class PlanDayExerciseRepository implements IPlanDayExerciseRepository {
  constructor(
    @Inject(PLAN_DAY_EXERCISE_REPOSITORY)
    private planDayExerciseModel: typeof PlanDayExercise,
  ) {}

  async findAll(): Promise<PlanDayExercise[]> {
    return this.planDayExerciseModel.findAll();
  }
}
