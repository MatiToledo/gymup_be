import { PartialType } from '@nestjs/swagger';
import { CreatePlanDayDto } from './create-plan_day.dto';

export class UpdatePlanDayDto extends PartialType(CreatePlanDayDto) {}
