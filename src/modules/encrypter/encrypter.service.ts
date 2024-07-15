import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';

@Injectable()
export class EncrypterService {
  async encrypt(password: string): Promise<string> {
    const iv = randomBytes(16);

    const key = (await promisify(scrypt)(
      process.env.ENCRYPT_HASH_PASSWORD,
      'salt',
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);

    return encryptedText.toString('hex');
  }
}
