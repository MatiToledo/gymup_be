import { AuthModule } from './resources/auth/auth.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './resources/database/database.module';
import { UserModule } from './resources/user/user.module';
import { ExerciseModule } from './resources/exercise/exercise.module';
import { PlanModule } from './resources/plan/plan.module';
import { PlanDayModule } from './resources/plan_day/plan_day.module';
import { PlanDayExerciseModule } from './resources/plan_day_exercise/plan_day_exercise.module';
import { I18nModule, HeaderResolver } from 'nestjs-i18n';
import { join } from 'path';
import { LoggerService } from './common/logger/logger.service';

@Module({
  imports: [
    DatabaseModule,
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: join(__dirname, '../i18n/'),
          watch: true,
        },
      }),
      resolvers: [new HeaderResolver(['x-custom-lang'])],
    }),
    AuthModule,
    UserModule,
    ExerciseModule,
    PlanModule,
    PlanDayModule,
    PlanDayExerciseModule,
  ],
  providers: [LoggerService],

  exports: [LoggerService],
})
export class AppModule {}
