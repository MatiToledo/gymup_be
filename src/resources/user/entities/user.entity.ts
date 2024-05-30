import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  Unique,
} from 'sequelize-typescript';
import { USERS_REPOSITORY } from '../../../common/constants';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: UUID;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  last_name: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.TEXT)
  password: string;

  @CreatedAt
  created_date: Date;

  @UpdatedAt
  updated_date: Date;
}

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
