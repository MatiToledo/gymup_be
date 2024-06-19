import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '../../common/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UUID } from 'crypto';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: UUID): Promise<User> {
    try {
      const user = this.userModel.findOne({ where: { id }, raw: true });
      if (!user) throw new NotFoundException(`User with ID ${id} not found`);
      return user;
    } catch (error) {
      console.error('error: ', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred while fetching the user',
        );
      }
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        where: { email },
        raw: true,
      });
      if (!user)
        throw new NotFoundException(`User with email ${email} not found`);
      return user;
    } catch (error) {
      console.error('error: ', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred while fetching the user',
        );
      }
    }
  }
}
