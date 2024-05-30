import { UUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export interface IUserRepository {
  create(user: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: UUID): Promise<User>;
  update(id: UUID, user: User): Promise<User>;
  delete(id: UUID): Promise<void>;
  findByEmail(email: string): Promise<User>;
}
