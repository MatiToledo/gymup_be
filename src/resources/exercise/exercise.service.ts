import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ExerciseRepository } from './exercIse.repository';
import { IExerciseService } from './exercise.interface';

@Injectable()
export class ExerciseService implements IExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async findAll() {
    return await this.exerciseRepository.findAll();
  }
}
