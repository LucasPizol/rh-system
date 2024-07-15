import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { EncrypterService } from '../encrypter/encrypter.service';
import { UserRepository, UserRepositoryBase } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    EncrypterService,
    PrismaService,
    AuthService,
    UserService,
    { provide: UserRepositoryBase, useClass: UserRepository },
  ],
})
export class AuthModule {}
