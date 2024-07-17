import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderRequestDTO {
  @IsString({ message: 'products must be typeof string[]' })
  @IsNotEmpty({ message: 'products is required' })
  products: string[];

  @IsNumber({}, { message: 'quantity must be typeof number' })
  @IsNotEmpty({ message: 'quantity is required' })
  quantity: number;

  @IsNumber({}, { message: 'value must be typeof number' })
  @IsNotEmpty({ message: 'value is required' })
  value: number;

  @IsString({ message: 'paymentMethodId must be typeof string' })
  @IsNotEmpty({ message: 'paymentMethodId is required' })
  paymentMethodId: string;

  @IsNumber({}, { message: 'paymentMethodId must be typeof string' })
  @IsNotEmpty({ message: 'paymentMethodId is required' })
  type: number;

  customerId: string | null;
  invoiceNumber: number;
  invoiceUrl: string;
}
