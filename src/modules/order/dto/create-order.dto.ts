import { IsNotEmpty } from 'class-validator';
import { CreateOrderServiceDTO } from './create-order-service.dto';

export class CreateOrderDTO extends CreateOrderServiceDTO {
  @IsNotEmpty({ message: 'productSellPrice is required' })
  productSellPrice: number;

  @IsNotEmpty({ message: 'productBoughtPrice is required' })
  productBoughtPrice: number;
}
