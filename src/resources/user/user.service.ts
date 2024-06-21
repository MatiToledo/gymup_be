import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LogInDto } from '../auth/dto/log_in.dto';

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

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async checkIfAlreadyExists(email: string) {
    return await this.userRepository.checkIfAlreadyExists(email);
  }
}
