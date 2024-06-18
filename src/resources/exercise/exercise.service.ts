import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from './exercIse.repository';
import { IExerciseService } from './exercise.interface';

@Injectable()
export class ExerciseService implements IExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async findAllNames() {
    const exercises = await this.exerciseRepository.findAll();
    return exercises.map((exercise) => exercise.name);
  }
}
