import { Module } from '@nestjs/common';
import { planDayExercisesProviders } from './entities/plan_day_exercise.entity';
import { PlanDayExerciseController } from './plan_day_exercise.controller';
import { PlanDayExerciseRepository } from './plan_day_exercise.repository';
import { PlanDayExerciseService } from './plan_day_exercise.service';

@Module({
  controllers: [PlanDayExerciseController],
  providers: [
    PlanDayExerciseService,
    PlanDayExerciseRepository,
    ...planDayExercisesProviders,
  ],
  exports: [PlanDayExerciseService, PlanDayExerciseRepository],
})
export class PlanDayExerciseModule {}
