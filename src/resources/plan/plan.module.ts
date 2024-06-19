import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { plansProviders } from './entities/plan.entity';
import { ExerciseModule } from '../exercise/exercise.module';
import { PlanDayModule } from '../plan_day/plan_day.module';
import { PlanDayExerciseModule } from '../plan_day_exercise/plan_day_exercise.module';

@Module({
  imports: [ExerciseModule, PlanDayModule, PlanDayExerciseModule],
  controllers: [PlanController],
  providers: [PlanService, PlanRepository, ...plansProviders],
  exports: [PlanService, PlanRepository],
})
export class PlanModule {}
