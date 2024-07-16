import { IsNotEmpty } from 'class-validator';
import { HistoricType } from '../interfaces/historic-type';

export class CreateHistoricDTO {
  @IsNotEmpty({ message: 'productId is required' })
  productId: string;

  @IsNotEmpty({ message: 'companyId is required' })
  companyId: string;

  @IsNotEmpty({ message: 'sellPrice is required' })
  sellPrice: number;

  @IsNotEmpty({ message: 'boughtPrice is required' })
  boughtPrice: number;

  @IsNotEmpty({ message: 'lastQuantity is required' })
  lastQuantity: number;

  @IsNotEmpty({ message: 'userId is required' })
  userId: string;

  @IsNotEmpty({ message: 'type is required' })
  type: HistoricType;

  @IsNotEmpty({ message: 'quantity is required' })
  quantity: number;
}
