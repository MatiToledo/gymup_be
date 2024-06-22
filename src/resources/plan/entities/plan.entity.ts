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
import { PlanDay } from '../../plan_day/entities/plan_day.entity';
import { PLAN_REPOSITORY } from '../../../common/constants';
import { User } from '../../user/entities/user.entity';

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum AgeRangeEnum {
  '13-17' = '13-17',
  '18-24' = '18-24',
  '25-34' = '25-34',
  '35-44' = '35-44',
  '45-54' = '45-54',
  '55-64' = '55-64',
  '+65' = '+65',
}

export enum ExperienceLevelEnum {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export enum GoalEnum {
  MuscleGain = 'Muscle Gain',
  WeightLoss = 'Weight Loss',
  Endurance = 'Endurance',
  GeneralFitness = 'General Fitness',
  Strength = 'Strength',
  Flexibility = 'Flexibility',
  SportsPerformance = 'Sports Performance',
  Rehabilitation = 'Rehabilitation',
}

@Table
export class Plan extends Model<Plan> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: UUID;

  @Column({ type: DataType.STRING(255) })
  name: string;

  @Column({ type: DataType.ENUM(...Object.values(GenderEnum)) })
  gender: string;

  @Column({ type: DataType.ENUM(...Object.values(AgeRangeEnum)) })
  ageRange: string;

  @Column({ type: DataType.ENUM(...Object.values(ExperienceLevelEnum)) })
  experienceLevel: string;

  @Default(true)
  @Column({ type: DataType.BOOLEAN })
  isCurrent: boolean;

  @Column({
    type: DataType.INTEGER,
    validate: {
      isIn: [[1, 2, 3, 4, 5, 6, 7]],
    },
  })
  daysPerWeek: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      isIn: [[0.5, 1, 2, 3, 4]],
    },
  })
  hoursPerDay: number;

  @Column({
    type: DataType.ENUM(...Object.values(GoalEnum)),
  })
  goal: string;

  @HasMany(() => PlanDay)
  planDays: PlanDay[];

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  UserId: UUID;

  @BelongsTo(() => User)
  user: User;
}

export const plansProviders = [
  {
    provide: PLAN_REPOSITORY,
    useValue: Plan,
  },
];
