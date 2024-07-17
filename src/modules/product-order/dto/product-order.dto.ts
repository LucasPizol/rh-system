import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductOrderDTO {
  @IsNotEmpty({ message: 'productId is required' })
  @IsString({ message: 'productId must be typeof string' })
  productId: string;

  @IsNotEmpty({ message: 'orderId is required' })
  @IsString({ message: 'orderId must be typeof string' })
  orderId: string;

  @IsNotEmpty({ message: 'quantity is required' })
  @IsNumber({}, { message: 'quantity must be typeof number' })
  quantity: number;

  @IsNotEmpty({ message: 'value is required' })
  @IsNumber({}, { message: 'value must be typeof number' })
  value: number;
}
