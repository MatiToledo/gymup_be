import { AuthModule } from './resources/auth/auth.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './resources/database/database.module';
import { UserModule } from './resources/user/user.module';
import { ExerciseModule } from './resources/exercise/exercise.module';
import { PlanModule } from './resources/plan/plan.module';
import { PlanDayModule } from './resources/plan_day/plan_day.module';
import { PlanDayExerciseModule } from './resources/plan_day_exercise/plan_day_exercise.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ExerciseModule,
    PlanModule,
    PlanDayModule,
    PlanDayExerciseModule,
  ],
})
export class AppModule {}
