import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/log_in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  saltOrRounds: number = 10;

  async logIn(body: LogInDto) {
    body.password = await bcrypt.hash(body.password, this.saltOrRounds);
    return this.userService.create(body);
  }

  async signIn(body: Partial<User>) {
    const user = await this.userService.findByEmail(body.email);
    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      throw new BadRequestException("Passwords don't match");
    }

    const payload = { email: user.email, id: user.id };
    const AccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });
    return {
      access_token: AccessToken,
    };
  }
}
