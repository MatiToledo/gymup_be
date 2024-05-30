import { Module } from '@nestjs/common';
import { PlanDayExerciseService } from './plan_day_exercise.service';
import { PlanDayExerciseController } from './plan_day_exercise.controller';

@Module({
  controllers: [PlanDayExerciseController],
  providers: [PlanDayExerciseService],
})
export class PlanDayExerciseModule {}
