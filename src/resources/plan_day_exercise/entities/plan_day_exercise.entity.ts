import { UUID } from 'crypto';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PLAN_DAY_EXERCISE_REPOSITORY } from '../../../common/constants';
import { Exercise } from '../../exercise/entities/exercise.entity';
import { PlanDay } from '../../plan_day/entities/plan_day.entity';

@Table
export class PlanDayExercise extends Model<PlanDayExercise> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: UUID;

  @ForeignKey(() => PlanDay)
  @Column(DataType.UUID)
  PlanDayId: UUID;

  @BelongsTo(() => PlanDay)
  planDay: PlanDay;

  @ForeignKey(() => Exercise)
  @Column(DataType.UUID)
  ExerciseId: UUID;

  @BelongsTo(() => Exercise)
  exercise: Exercise;

  @Column({ type: DataType.INTEGER })
  sets: number;

  @Column({ type: DataType.INTEGER })
  repetitions: number;

  @Column({ type: DataType.INTEGER })
  duration: number;

  @Column({ type: DataType.INTEGER })
  rest: number;
}

export const planDayExercisesProviders = [
  {
    provide: PLAN_DAY_EXERCISE_REPOSITORY,
    useValue: PlanDayExercise,
  },
];
