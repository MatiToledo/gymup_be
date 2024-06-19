import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogUpDto } from './dto/log_up.dto';
import { SignInDto } from './dto/sig_in.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logUp')
  create(@Body() body: LogUpDto) {
    return this.authService.logUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  sigIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() req) {
    return req.user;
  }
}
