import { IsNotEmpty } from 'class-validator';
import { CreateHistoricRequestDTO } from './create-historic-request.dto';

export class CreateHistoricDTO extends CreateHistoricRequestDTO {
  @IsNotEmpty({ message: 'sellPrice is required' })
  sellPrice: number;

  @IsNotEmpty({ message: 'boughtPrice is required' })
  boughtPrice: number;

  @IsNotEmpty({ message: 'lastQuantity is required' })
  lastQuantity: number;
}
