import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      return this.exerciseModel.findAll();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('common.internalServerError');
    }
  }
}
