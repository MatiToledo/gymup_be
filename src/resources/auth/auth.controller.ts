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
import { SignInDto } from './dto/sig_in.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Public } from 'src/common/swagger/public.decorator';
import { LogInDto } from './dto/log_in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('logIn')
  create(@Body() body: LogInDto) {
    return this.authService.logIn(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  sigIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
