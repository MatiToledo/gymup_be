import { Injectable } from '@nestjs/common';
import { IPlanDayExerciseService } from './plan_day_exercise.interface';
import { PlanDayExerciseRepository } from './plan_day_exercise.repository';

@Injectable()
export class PlanDayExerciseService implements IPlanDayExerciseService {
  constructor(
    private readonly planDayExerciseRepository: PlanDayExerciseRepository,
  ) {}

  findAll() {
    return this.planDayExerciseRepository.findAll();
  }
}
