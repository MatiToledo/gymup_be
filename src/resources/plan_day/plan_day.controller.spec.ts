import { Test, TestingModule } from '@nestjs/testing';
import { PlanDayController } from './plan_day.controller';
import { PlanDayService } from './plan_day.service';

describe('PlanDayController', () => {
  let controller: PlanDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanDayController],
      providers: [PlanDayService],
    }).compile();

    controller = module.get<PlanDayController>(PlanDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
