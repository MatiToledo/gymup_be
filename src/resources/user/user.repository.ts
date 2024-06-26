import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { USER_REPOSITORY } from '../../common/constants';
import { LogInDto } from '../auth/dto/log_in.dto';
import { User } from './entities/user.entity';
import { Exercise } from '../exercise/entities/exercise.entity';
import { PlanDay } from '../plan_day/entities/plan_day.entity';
import { PlanDayExercise } from '../plan_day_exercise/entities/plan_day_exercise.entity';
import { Plan } from '../plan/entities/plan.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    private userModel: typeof User,
    private readonly i18n: I18nService,
  ) {}

  async create(user: LogInDto): Promise<User> {
    try {
      return await this.userModel.create(user);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('common.internalServerError');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.findAll();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('common.internalServerError');
    }
  }

  async findMe(id: UUID): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        where: { id },
        include: [
          {
            model: Plan,
            where: { isCurrent: true },
            include: [
              {
                model: PlanDay,
                include: [
                  { model: PlanDayExercise, include: [{ model: Exercise }] },
                ],
              },
            ],
          },
        ],
      });
      if (!user) throw new NotFoundException('common.user.notFound');
      return user;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('common.internalServerError');
      }
    }
  }
  async findById(id: UUID): Promise<User> {
    try {
      const user = await this.userModel.findOne({ where: { id }, raw: true });
      if (!user) throw new NotFoundException('common.user.notFound');
      return user;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('common.internalServerError');
      }
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        where: { email },
        attributes: {
          include: ['password'],
        },
        raw: true,
      });
      if (!user) throw new NotFoundException('common.user.notFound');
      return user;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('common.internalServerError');
      }
    }
  }

  async checkIfAlreadyExists(email: string): Promise<void> {
    try {
      const user = await this.userModel.findOne({ where: { email } });
      if (user)
        throw new HttpException(
          'common.user.alreadyExists',
          HttpStatus.CONFLICT,
        );
      return;
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException('common.internalServerError');
      }
    }
  }
}
