import { PlanDay } from './entities/plan_day.entity';

export interface IPlanDayService {
  findAll(): Promise<PlanDay[]>;
}

export interface IPlanDayRepository {
  findAll(): Promise<PlanDay[]>;
}
