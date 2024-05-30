import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanDayExerciseService } from './plan_day_exercise.service';
import { CreatePlanDayExerciseDto } from './dto/create-plan_day_exercise.dto';
import { UpdatePlanDayExerciseDto } from './dto/update-plan_day_exercise.dto';

@Controller('plan-day-exercise')
export class PlanDayExerciseController {
  constructor(private readonly planDayExerciseService: PlanDayExerciseService) {}

  @Post()
  create(@Body() createPlanDayExerciseDto: CreatePlanDayExerciseDto) {
    return this.planDayExerciseService.create(createPlanDayExerciseDto);
  }

  @Get()
  findAll() {
    return this.planDayExerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planDayExerciseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDayExerciseDto: UpdatePlanDayExerciseDto) {
    return this.planDayExerciseService.update(+id, updatePlanDayExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planDayExerciseService.remove(+id);
  }
}
