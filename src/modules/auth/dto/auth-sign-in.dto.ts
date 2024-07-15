import { IsNotEmpty } from 'class-validator';

export class AuthSignInDTO {
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
