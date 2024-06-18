import { CreatePlanDto } from './dto/create-plan.dto';
import { Plan } from './entities/plan.entity';

export interface IPlanService {
  create(createPlanDto: CreatePlanDto): Promise<string>;
  findAll(): Promise<string[]>;
}

export interface IPlanRepository {
  findAll(): Promise<Plan[]>;
}
