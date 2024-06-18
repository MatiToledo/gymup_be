import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { ExerciseRepository } from './exercIse.repository';
import { exercisesProviders } from './entities/exercise.entity';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, ExerciseRepository, ...exercisesProviders],
  exports: [ExerciseService, ExerciseRepository],
})
export class ExerciseModule {}
