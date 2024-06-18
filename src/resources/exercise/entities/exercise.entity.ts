import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  DataType,
  Default,
} from 'sequelize-typescript';
import { PlanDayExercise } from '../../plan_day_exercise/entities/plan_day_exercise.entity';
import { UUID } from 'crypto';
import { EXERCISE_REPOSITORY } from '../../../common/constants';

export enum BodyPartTargetedEnum {
  CHEST = 'Chest',
  BACK = 'Back',
  BICEPS = 'Biceps',
  TRICEPS = 'Triceps',
  GLUTES = 'Glutes',
  LEGS = 'Legs',
  ARMS = 'Arms',
  HAMSTRINGS = 'Hamstrings',
  SHOULDERS = 'Shoulders',
  TWINS = 'Twins',
  FULL_BODY = 'Full Body',
  ABS = 'Abs',
  CALVES = 'Calves',
  HIP = 'Hip',
  OBLIQUES = 'Obliques',
  CARDIO = 'Cardio',
  CORE = 'Core',
}

@Table
export class Exercise extends Model<Exercise> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: UUID;

  @Column({ type: DataType.STRING(255), unique: true })
  name: string;

  @Column({
    type: DataType.ARRAY(DataType.ENUM(...Object.values(BodyPartTargetedEnum))),
  })
  bodyPartTargeted: BodyPartTargetedEnum[];

  @HasMany(() => PlanDayExercise)
  planDayExercises: PlanDayExercise[];
}

export const exercisesProviders = [
  {
    provide: EXERCISE_REPOSITORY,
    useValue: Exercise,
  },
];
