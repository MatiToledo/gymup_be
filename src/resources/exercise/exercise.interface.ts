import { Exercise } from './entities/exercise.entity';

export interface IExerciseService {
  findAll(): Promise<Exercise[]>;
}

export interface IExerciseRepository {
  findAll(): Promise<Exercise[]>;
}
