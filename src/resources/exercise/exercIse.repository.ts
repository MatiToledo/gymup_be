import { Inject, Injectable } from '@nestjs/common';
import { EXERCISE_REPOSITORY } from '../../common/constants';
import { Exercise } from './entities/exercise.entity';
import { IExerciseRepository } from './exercise.interface';

@Injectable()
export class ExerciseRepository implements IExerciseRepository {
  constructor(
    @Inject(EXERCISE_REPOSITORY)
    private exerciseModel: typeof Exercise,
  ) {}

  async findAll(): Promise<Exercise[]> {
    return this.exerciseModel.findAll();
  }
}
