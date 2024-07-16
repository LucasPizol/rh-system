import { IsNotEmpty } from 'class-validator';
import { CreateHistoricBodyRequestDTO } from './create-historic-body-request.dto';

export class CreateHistoricRequestDTO extends CreateHistoricBodyRequestDTO {
  @IsNotEmpty({ message: 'productId is required' })
  companyId: string;

  @IsNotEmpty({ message: 'productId is required' })
  userId: string;
}
