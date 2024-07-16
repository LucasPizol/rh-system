import { IsNotEmpty } from 'class-validator';
import { HistoricType } from '../interfaces/historic-type';

export class CreateHistoricBodyRequestDTO {
  @IsNotEmpty({ message: 'productId is required' })
  productId: string;

  @IsNotEmpty({ message: 'type is required' })
  type: HistoricType;

  @IsNotEmpty({ message: 'quantity is required' })
  quantity: number;
}
