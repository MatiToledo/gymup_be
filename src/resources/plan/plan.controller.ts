import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Public } from 'src/common/swagger/public.decorator';
import { UUID } from 'crypto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Public()
  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.planService.findOne(id);
  }
}
