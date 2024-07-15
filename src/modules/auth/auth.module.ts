import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncrypterService } from '../encrypter/encrypter.service';
import { UserRepository, UserRepositoryBase } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    { provide: UserRepositoryBase, useClass: UserRepository },
    JwtService,
    EncrypterService,
  ],
})
export class AuthModule {}
