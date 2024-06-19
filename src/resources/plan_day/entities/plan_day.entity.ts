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
import { PLAN_DAY_REPOSITORY } from '../../../common/constants';

export enum DayEnum {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

@Table
export class PlanDay extends Model<PlanDay> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: UUID;

  @ForeignKey(() => Plan)
  @Column(DataType.UUID)
  PlanId: UUID;

  @BelongsTo(() => Plan)
  plan: Plan;

  @Column({
    type: DataType.ENUM(...Object.values(DayEnum)),
  })
  day: string;

  @HasMany(() => PlanDayExercise)
  planDayExercises: PlanDayExercise[];
}

export const planDaysProviders = [
  {
    provide: PLAN_DAY_REPOSITORY,
    useValue: PlanDay,
  },
];
