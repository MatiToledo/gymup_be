import { UUID } from 'crypto';
import {
  AfterFind,
  BeforeFind,
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { USER_REPOSITORY } from '../../../common/constants';
import { Plan } from '../../plan/entities/plan.entity';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: UUID;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  lastName: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  onBoardingCompleted: boolean;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.TEXT)
  password: string;

  @HasMany(() => Plan)
  plans: Plan[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeFind
  static excludePasswordFromFind(options: any): void {
    if (!options.attributes) {
      options.attributes = {};
    }
    options.attributes.exclude = ['password'];
  }
}

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
