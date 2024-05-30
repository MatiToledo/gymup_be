import { Test, TestingModule } from '@nestjs/testing';
import { PlanDayExerciseController } from './plan_day_exercise.controller';
import { PlanDayExerciseService } from './plan_day_exercise.service';

describe('PlanDayExerciseController', () => {
  let controller: PlanDayExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanDayExerciseController],
      providers: [PlanDayExerciseService],
    }).compile();

    controller = module.get<PlanDayExerciseController>(PlanDayExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
