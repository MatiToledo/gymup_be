import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType,
  Default,
} from 'sequelize-typescript';
import { Exercise } from '../../exercise/entities/exercise.entity';
import { PlanDay } from '../../plan_day/entities/plan_day.entity';
import { UUID } from 'crypto';

@Table
export class PlanDayExercise extends Model<PlanDayExercise> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: UUID;

  @ForeignKey(() => PlanDay)
  @Column(DataType.UUID)
  planDayId: UUID;

  @BelongsTo(() => PlanDay)
  planDay: PlanDay;

  @ForeignKey(() => Exercise)
  @Column(DataType.UUID)
  exerciseId: UUID;

  @BelongsTo(() => Exercise)
  exercise: Exercise;

  @Column({ type: DataType.INTEGER })
  sets: number;

  @Column({ type: DataType.INTEGER })
  repetitions: number;

  @Column({ type: DataType.INTEGER })
  duration: number;
}
