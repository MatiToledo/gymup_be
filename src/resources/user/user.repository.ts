import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../common/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ where: { email }, raw: true });
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }
}
