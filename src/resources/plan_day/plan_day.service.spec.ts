import { Test, TestingModule } from '@nestjs/testing';
import { PlanDayService } from './plan_day.service';

describe('PlanDayService', () => {
  let service: PlanDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanDayService],
    }).compile();

    service = module.get<PlanDayService>(PlanDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
