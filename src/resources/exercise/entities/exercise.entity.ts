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

export enum BodyPartTargetedEnum {
  CHEST = 'Pecho',
  BACK = 'Espalda',
  BICEPS = 'Biceps',
  TRICEPS = 'Triceps',
  GLUTES = 'Gluteos',
  LEGS = 'Piernas',
  HAMSTRINGS = 'Isquios',
  SHOULDERS = 'Hombros',
  TWINS = 'Gemelos',
  FULL_BODY = 'Cuerpo',
  ABS = 'Abs',
  CALVES = 'Pantorillas',
  HIP = 'Cadera',
  OBLIQUES = 'Oblicuos',
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

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({
    type: DataType.ARRAY(DataType.ENUM(...Object.values(BodyPartTargetedEnum))),
  })
  bodyPartTargeted: BodyPartTargetedEnum[];

  @HasMany(() => PlanDayExercise)
  planDayExercises: PlanDayExercise[];
}
