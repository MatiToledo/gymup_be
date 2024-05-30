import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';
import { Exercise } from '../exercise/entities/exercise.entity';
import { PlanDay } from '../plan_day/entities/plan_day.entity';
import { PlanDayExercise } from '../plan_day_exercise/entities/plan_day_exercise.entity';
import { Plan } from '../plan/entities/plan.entity';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  raw: true,
  logging: false,
  dialectOptions: {
    statement_timeout: 150000,
    lock_timeout: 150000,
    iddle_in_transaction_session_timeout: 50000,
    useUTC: true,
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
  timezone: 'UTC',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
} as any);

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      sequelize.authenticate();
      sequelize.addModels([User, Exercise, Plan, PlanDay, PlanDayExercise]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
