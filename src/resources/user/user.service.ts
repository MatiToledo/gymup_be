import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LogInDto } from '../auth/dto/log_in.dto';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: LogInDto) {
    await this.userRepository.checkIfAlreadyExists(user.email);
    return await this.userRepository.create(user);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: UUID) {
    return await this.userRepository.findById(id);
  }

  async findMe(id: UUID) {
    return await this.userRepository.findMe(id);
    // const plan = currentPlan.planDays.map((planDay) => {
    //   return {
    //     PlanDayId: planDay.id,
    //     day: planDay.day,
    //     exercises: planDay.planDayExercises.map((planDayExercise) => {
    //       return {
    //         name: planDayExercise.exercise.name,
    //         sets: planDayExercise.sets,
    //         duration: planDayExercise.duration,
    //         repetitions: planDayExercise.repetitions,
    //         rest: planDayExercise.rest,
    //       };
    //     }),
    //   };
    // });
    // const meCopy = me.toJSON();
    // delete meCopy.plans;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async checkIfAlreadyExists(email: string) {
    return await this.userRepository.checkIfAlreadyExists(email);
  }
}
