import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanDayExerciseService } from './plan_day_exercise.service';
import { CreatePlanDayExerciseDto } from './dto/create-plan_day_exercise.dto';
import { UpdatePlanDayExerciseDto } from './dto/update-plan_day_exercise.dto';

@Controller('plan-day-exercise')
export class PlanDayExerciseController {
  constructor(
    private readonly planDayExerciseService: PlanDayExerciseService,
  ) {}

  @Get()
  findAll() {
    return this.planDayExerciseService.findAll();
  }
}
