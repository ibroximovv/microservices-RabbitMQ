import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from '@app/l';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register-auth')
  registerAuth(@Body() data: RegisterAuthDto ) {
    return this.authService.registerAuht(data)
  }

  @Post('login-auth')
  loginAuth(@Body() data: LoginAuthDto ) {
    return this.authService.loginAuth(data)
  }

  @Get('get-user')
  getUser() {
    return this.authService.getAllUser()
  }
}
