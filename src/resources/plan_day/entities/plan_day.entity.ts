import { UUID } from 'crypto';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Plan } from '../../plan/entities/plan.entity';
import { PlanDayExercise } from '../../plan_day_exercise/entities/plan_day_exercise.entity';

export enum DayEnum {
  Monday = 'Lunes',
  Tuesday = 'Martes',
  Wednesday = 'Miércoles',
  Thursday = 'Jueves',
  Friday = 'Viernes',
  Saturday = 'Sábado',
  Sunday = 'Domingo',
}

@Table
export class PlanDay extends Model<PlanDay> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: UUID;

  @ForeignKey(() => Plan)
  @Column(DataType.UUID)
  planId: UUID;

  @BelongsTo(() => Plan)
  plan: Plan;

  @Column({
    type: DataType.ENUM(...Object.values(DayEnum)),
  })
  day: string;

  @HasMany(() => PlanDayExercise)
  planDayExercises: PlanDayExercise[];
}
