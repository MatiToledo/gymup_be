import { Injectable } from '@nestjs/common';
import { CreatePlanDayExerciseDto } from './dto/create-plan_day_exercise.dto';
import { UpdatePlanDayExerciseDto } from './dto/update-plan_day_exercise.dto';

@Injectable()
export class PlanDayExerciseService {
  create(createPlanDayExerciseDto: CreatePlanDayExerciseDto) {
    return 'This action adds a new planDayExercise';
  }

  findAll() {
    return `This action returns all planDayExercise`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planDayExercise`;
  }

  update(id: number, updatePlanDayExerciseDto: UpdatePlanDayExerciseDto) {
    return `This action updates a #${id} planDayExercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} planDayExercise`;
  }
}
