import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { generatePlanWithAI } from 'src/utils/openAI';
import { UserService } from '../user/user.service';
import { ExerciseService } from '../exercise/exercise.service';
import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly planRepository: PlanRepository,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    const allExercises = await this.exerciseService.findAllNames();
    // const ai_plan = await generatePlanWithAI({
    //   ...createPlanDto,
    //   allExercises,
    // });
    const ai_plan = {
      name: '3-Day Full Body Muscle Gain Plan',
      gender: 'Male',
      ageRange: '18-24',
      experienceLevel: 'Intermediate',
      goal: 'Muscle Gain',
      daysPerWeek: 3,
      planStructure: 'FullBody',
      hoursPerDay: 2,
      days: [
        {
          day: 'Monday',
          exercises: [
            {
              name: 'Jump rope',
              sets: null,
              repetitions: null,
              duration: 10,
              rest: null,
            },
            {
              name: 'Barbell squats',
              sets: 4,
              repetitions: 8,
              duration: null,
              rest: 90,
            },
            {
              name: 'Bench press',
              sets: 4,
              repetitions: 8,
              duration: null,
              rest: 90,
            },
            {
              name: 'Barbell row',
              sets: 4,
              repetitions: 10,
              duration: null,
              rest: 90,
            },
            {
              name: 'Dumbbell bicep curl',
              sets: 3,
              repetitions: 12,
              duration: null,
              rest: 60,
            },
            {
              name: 'Tricep pushdown',
              sets: 3,
              repetitions: 12,
              duration: null,
              rest: 60,
            },
            {
              name: 'Plank',
              sets: 3,
              repetitions: null,
              duration: null,
              rest: 60,
            },
          ],
        },
        {
          day: 'Wednesday',
          exercises: [
            {
              name: 'Sprints on treadmill',
              sets: null,
              repetitions: null,
              duration: 10,
              rest: null,
            },
            {
              name: 'Deadlift',
              sets: 4,
              repetitions: 8,
              duration: null,
              rest: 90,
            },
            {
              name: 'Incline bench press',
              sets: 4,
              repetitions: 8,
              duration: null,
              rest: 90,
            },
            {
              name: 'Lat pulldown',
              sets: 4,
              repetitions: 10,
              duration: null,
              rest: 90,
            },
            {
              name: 'Dumbbell shoulder press',
              sets: 3,
              repetitions: 12,
              duration: null,
              rest: 60,
            },
            {
              name: 'Leg press',
              sets: 3,
              repetitions: 12,
              duration: null,
              rest: 60,
            },
            {
              name: 'Hanging leg raises',
              sets: 3,
              repetitions: 15,
              duration: null,
              rest: 60,
            },
          ],
        },
        {
          day: 'Friday',
          exercises: [
            {
              name: 'Battle ropes',
              sets: null,
              repetitions: null,
              duration: 10,
              rest: null,
            },
            {
              name: 'Bulgarian split squats',
              sets: 4,
              repetitions: 10,
              duration: null,
              rest: 90,
            },
            {
              name: 'Dumbbell chest press',
              sets: 4,
              repetitions: 10,
              duration: null,
              rest: 90,
            },
            {
              name: 'Pull-ups',
              sets: 4,
              repetitions: 10,
              duration: null,
              rest: 90,
            },
            {
              name: 'Lateral raises',
              sets: 3,
              repetitions: 12,
              duration: null,
              rest: 60,
            },
            {
              name: 'Machine bicep curl',
              sets: 3,
              repetitions: 12,
              duration: null,
              rest: 60,
            },
            {
              name: 'Tricep pushdown',
              sets: 3,
              repetitions: 12,
              duration: null,
              rest: 60,
            },
            {
              name: 'Russian twists',
              sets: 3,
              repetitions: 20,
              duration: null,
              rest: 60,
            },
          ],
        },
      ],
    };
    const createdPlan = await this.planRepository.create({
      name: ai_plan.name,
      goal: ai_plan.goal,
      gender: ai_plan.gender,
      ageRange: ai_plan.ageRange,
      experienceLevel: ai_plan.experienceLevel,
      hoursPerDay: ai_plan.hoursPerDay,
      daysPerWeek: ai_plan.daysPerWeek,
    });
    return ai_plan;
  }

  findAll() {
    return `This action returns all plan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
