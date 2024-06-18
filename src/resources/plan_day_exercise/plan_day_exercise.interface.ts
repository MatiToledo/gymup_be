import { PlanDayExercise } from './entities/plan_day_exercise.entity';

export interface IPlanDayExerciseService {
  findAll(): Promise<PlanDayExercise[]>;
}

export interface IPlanDayExerciseRepository {
  findAll(): Promise<PlanDayExercise[]>;
}
