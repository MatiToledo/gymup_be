import { Test, TestingModule } from '@nestjs/testing';
import { PlanDayExerciseService } from './plan_day_exercise.service';

describe('PlanDayExerciseService', () => {
  let service: PlanDayExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanDayExerciseService],
    }).compile();

    service = module.get<PlanDayExerciseService>(PlanDayExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
