import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/security/auth-guard';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthSignInDTO } from './dto/auth-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async signIn(@Body() data: AuthSignInDTO) {
    return await this.authService.signIn(data);
  }

  @Public()
  @Post('/register')
  async register(@Body() data: CreateUserDTO) {
    return await this.authService.register(data);
  }
}
