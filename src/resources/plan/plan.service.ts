import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { generateValidPlanWithAI, PlanAI } from 'src/utils/openAI';
import { ExerciseService } from '../exercise/exercise.service';
import { PlanDayService } from '../plan_day/plan_day.service';
import { PlanDayExerciseService } from '../plan_day_exercise/plan_day_exercise.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly planDayService: PlanDayService,
    private readonly planDayExerciseService: PlanDayExerciseService,
    private readonly planRepository: PlanRepository,
  ) {}

  async create(createPlanDto: CreatePlanDto, UserId: UUID) {
    const allExercises = await this.exerciseService.findAll();
    const ai_plan: PlanAI = await generateValidPlanWithAI({
      ...createPlanDto,
      allExercises: allExercises.map((e) => e.name),
    });

    const createdPlan = await this.planRepository.create({
      name: ai_plan.name,
      goal: ai_plan.goal,
      gender: ai_plan.gender,
      ageRange: ai_plan.ageRange,
      experienceLevel: ai_plan.experienceLevel,
      hoursPerDay: ai_plan.hoursPerDay,
      daysPerWeek: ai_plan.daysPerWeek,
      UserId,
    });

    const planDayBulk = ai_plan.days.map((day) => ({
      PlanId: createdPlan.id,
      day: day.day,
    }));

    const createdPlanDays = await this.planDayService.bulkCreate(planDayBulk);
    const planDayExerciseBulk =
      this.planDayExerciseService.generateBulkCreateData(
        ai_plan.days,
        createdPlanDays,
        allExercises,
      );

    await this.planDayExerciseService.bulkCreate(planDayExerciseBulk);

    return await this.planRepository.findById(createdPlan.id);
  }

  async findOne(id: UUID) {
    return await this.planRepository.findById(id);
  }
}
