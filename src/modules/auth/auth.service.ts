import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { EncrypterService } from '../encrypter/encrypter.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthSignInDTO } from './dto/auth-sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private encrypterService: EncrypterService,
  ) {}

  async signIn(data: AuthSignInDTO): Promise<{ access_token: string }> {
    const { username, password } = data;

    const user = await this.usersService.findByUsername(username);

    const hashPassword = await this.encrypterService.encrypt(password);

    if (!user) throw new NotFoundException('User not found');

    if (user.password !== hashPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: CreateUserDTO) {
    const verifyUser = await this.usersService.findByUsername(data.username);

    if (verifyUser) throw new ConflictException('User already exists');

    const hashPassword = await this.encrypterService.encrypt(data.password);

    return await this.usersService.createUser({
      ...data,
      password: hashPassword,
    });
  }
}
