import { Module } from '@nestjs/common';
import { usersProviders } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, ...usersProviders],
  exports: [UserService, UserRepository],
})
export class UserModule {}
