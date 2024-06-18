import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/swagger/public.decorator';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Public()
  @Get()
  findAll() {
    return this.exerciseService.findAllNames();
  }
}
