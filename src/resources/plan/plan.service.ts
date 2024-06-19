import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { generatePlanWithAI, PlanAI } from 'src/utils/openAI';
import { ExerciseService } from '../exercise/exercise.service';
import { PlanRepository } from './plan.repository';
import { PlanDayService } from '../plan_day/plan_day.service';
import { PlanDayExerciseService } from '../plan_day_exercise/plan_day_exercise.service';
import { UUID } from 'crypto';

@Injectable()
export class PlanService {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly planDayService: PlanDayService,
    private readonly planDayExerciseService: PlanDayExerciseService,
    private readonly planRepository: PlanRepository,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    const allExercises = await this.exerciseService.findAll();
    const ai_plan: PlanAI = await generatePlanWithAI({
      ...createPlanDto,
      allExercises: allExercises.map((e) => e.name),
    });
    console.log('ai_plan: ', ai_plan);

    const createdPlan = await this.planRepository.create({
      name: ai_plan.name,
      goal: ai_plan.goal,
      gender: ai_plan.gender,
      ageRange: ai_plan.ageRange,
      experienceLevel: ai_plan.experienceLevel,
      hoursPerDay: ai_plan.hoursPerDay,
      daysPerWeek: ai_plan.daysPerWeek,
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

  findAll() {
    return `This action returns all plan`;
  }

  async findOne(id: UUID) {
    return await this.planRepository.findById(id);
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
