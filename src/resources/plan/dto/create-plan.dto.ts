import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  AgeRangeEnum,
  ExperienceLevelEnum,
  GenderEnum,
  GoalEnum,
} from '../entities/plan.entity';

export class CreatePlanDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEnum(GenderEnum, { message: 'gender must be a valid enum value' })
  gender: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEnum(AgeRangeEnum, { message: 'ageRange must be a valid enum value' })
  ageRange: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEnum(ExperienceLevelEnum, {
    message: 'experienceLevel must be a valid enum value',
  })
  experienceLevel: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  daysPerWeek: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  hoursPerDay: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEnum(GoalEnum, {
    message: 'goal must be a valid enum value',
  })
  goal: string;
}
