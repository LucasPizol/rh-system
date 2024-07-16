import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInstallmentDTO {
  @IsString({ message: 'orderId must be typeof string' })
  @IsNotEmpty({ message: 'orderId is required' })
  orderId: string;

  @IsNumber({}, { message: 'value must be typeof number' })
  @IsNotEmpty({ message: 'value is required' })
  value: number;

  @IsDate({ message: 'expiresIn must be typeof date' })
  @IsNotEmpty({ message: 'expiresIn is required' })
  expiresIn: Date;
}
