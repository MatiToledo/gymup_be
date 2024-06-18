import { Exercise } from './entities/exercise.entity';

export interface IExerciseService {
  findAllNames(): Promise<string[]>;
}

export interface IExerciseRepository {
  findAll(): Promise<Exercise[]>;
}
