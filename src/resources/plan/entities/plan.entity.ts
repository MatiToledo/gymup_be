import { UUID } from 'crypto';
import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PlanDay } from '../../plan_day/entities/plan_day.entity';

export enum SexEnum {
  Female = 'Mujer',
  Male = 'Hombre',
}

export enum AgeRangeEnum {
  '18-24' = '18-24',
  '25-34' = '25-34',
  '35-54' = '35-54',
  '55+' = '55+',
}

export enum LevelEnum {
  Beginner = 'Principiante',
  Intermediate = 'Intermedio',
  Advanced = 'Avanzado',
}

export enum GoalEnum {
  LoseWeight = 'Perder peso',
  Tone = 'Tonificar',
  MuscleMass = 'Masa muscular',
  MuscleDefinition = 'Definicion muscular',
}

@Table
export class Plan extends Model<Plan> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: UUID;

  @Column({ type: DataType.STRING(255) })
  name: string;

  @Column({ type: DataType.ENUM(...Object.values(SexEnum)) })
  sex: string;

  @Column({ type: DataType.ENUM(...Object.values(AgeRangeEnum)) })
  ageRange: string;

  @Column({ type: DataType.ENUM(...Object.values(LevelEnum)) })
  level: string;

  @Column({
    type: DataType.ENUM(...Object.values(GoalEnum)),
  })
  goal: string;

  @HasMany(() => PlanDay)
  planDays: PlanDay[];
}
