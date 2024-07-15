import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

export abstract class UserRepositoryBase {
  abstract createUser(data: CreateUserDTO): Promise<User>;
  abstract findByUsername(username: string): Promise<User | null>;
}

export class UserRepository implements UserRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }
}
