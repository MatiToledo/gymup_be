import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IPlanDayService } from './plan_day.interface';
import { PlanDayRepository } from './plan_day.repository';
import { PlanDay } from './entities/plan_day.entity';
import { InternalServerError } from 'openai';

@Injectable()
export class PlanDayService implements IPlanDayService {
  constructor(private readonly planDayRepository: PlanDayRepository) {}

  bulkCreate(data: Partial<PlanDay>[]) {
    try {
      return this.planDayRepository.bulkCreate(data);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('common.internalServerError');
    }
  }

  findAll() {
    try {
      return this.planDayRepository.findAll();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('common.internalServerError');
    }
  }
}
