import { IsNotEmpty } from 'class-validator';

export class CreatePaymentMethodDTO {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'expirationDays is required' })
  expirationDays: number[];
}
