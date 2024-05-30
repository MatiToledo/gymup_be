import { PartialType } from '@nestjs/swagger';
import { CreatePlanDayExerciseDto } from './create-plan_day_exercise.dto';

export class UpdatePlanDayExerciseDto extends PartialType(CreatePlanDayExerciseDto) {}
