import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { plansProviders } from './entities/plan.entity';
import { ExerciseModule } from '../exercise/exercise.module';

@Module({
  imports: [ExerciseModule],
  controllers: [PlanController],
  providers: [PlanService, PlanRepository, ...plansProviders],
  exports: [PlanService, PlanRepository],
})
export class PlanModule {}
