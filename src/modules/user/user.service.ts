import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepositoryBase } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryBase) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    return await this.userRepository.createUser(data);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findByUsername(username);
  }
}
