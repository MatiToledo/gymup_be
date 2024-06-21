import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IPlanDayExerciseService } from './plan_day_exercise.interface';
import { PlanDayExerciseRepository } from './plan_day_exercise.repository';
import { PlanDayExercise } from './entities/plan_day_exercise.entity';
import { Exercise } from '../exercise/entities/exercise.entity';
import { UUID } from 'crypto';
import { DayPlanAI } from 'src/utils/openAI';
import { PlanDay } from '../plan_day/entities/plan_day.entity';

@Injectable()
export class PlanDayExerciseService implements IPlanDayExerciseService {
  constructor(
    private readonly planDayExerciseRepository: PlanDayExerciseRepository,
  ) {}

  bulkCreate(data: Partial<PlanDayExercise>[]) {
    try {
      return this.planDayExerciseRepository.bulkCreate(data);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('common.internalServerError');
    }
  }

  findAll() {
    try {
      return this.planDayExerciseRepository.findAll();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('common.internalServerError');
    }
  }

  generateBulkCreateData(
    days: DayPlanAI[],
    planDays: PlanDay[],
    allExercises: Exercise[],
  ) {
    const data = [];
    for (const day of days) {
      for (const exercise of day.exercises) {
        const foundExercise = allExercises.find(
          (e) => e.name === exercise.name,
        );
        if (foundExercise) {
          data.push({
            PlanDayId: planDays.find((p) => p.day === day.day).id,
            ExerciseId: foundExercise.id,
            sets: exercise.sets,
            repetitions: exercise.repetitions,
            duration: exercise.duration,
            rest: exercise.rest,
          });
        }
      }
    }

    return data;
  }
}
