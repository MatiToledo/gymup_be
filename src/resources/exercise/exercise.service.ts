import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ExerciseRepository } from './exercIse.repository';
import { IExerciseService } from './exercise.interface';

@Injectable()
export class ExerciseService implements IExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async findAll() {
    try {
      const exercises = await this.exerciseRepository.findAll();
      return exercises.map((exercise) => exercise.name) as any;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while fetching the exercises',
      );
    }
  }
}
