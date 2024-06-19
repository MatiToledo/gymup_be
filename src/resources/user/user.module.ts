import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { usersProviders } from './entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, ...usersProviders],
  exports: [UserService],
})
export class UserModule {}
