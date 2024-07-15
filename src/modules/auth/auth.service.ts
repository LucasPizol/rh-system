import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
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

  async signIn(
    data: AuthSignInDTO,
  ): Promise<Omit<User, 'password'> & { access_token: string }> {
    const { username, password } = data;

    const user = await this.usersService.findByUsername(username);

    const isSamePassword = await this.encrypterService.compare(
      password,
      user.password,
    );

    if (!user) throw new NotFoundException('User not found');

    if (!isSamePassword) throw new UnauthorizedException();

    const payload = {
      id: user.id,
      username: user.username,
      companyId: user.companyId,
    };
    const { password: _, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const verifyUser = await this.usersService.findByUsername(data.username);

    if (verifyUser) throw new ConflictException('User already exists');

    const hashPassword = await this.encrypterService.encrypt(data.password);

    const user = await this.usersService.createUser({
      ...data,
      password: hashPassword,
    });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
