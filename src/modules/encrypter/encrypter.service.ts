import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class EncrypterService {
  async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, encryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
