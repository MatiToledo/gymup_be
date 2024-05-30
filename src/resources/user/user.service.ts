import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(user: CreateUserDto) {
    return this.userRepository.create(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
