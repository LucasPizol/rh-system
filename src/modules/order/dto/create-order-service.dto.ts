import { IsNotEmpty, IsString } from 'class-validator';
import { CreateOrderRequestDTO } from './create-order-request.dto';

export class CreateOrderServiceDTO extends CreateOrderRequestDTO {
  @IsString({ message: 'companyId must be typeof string' })
  @IsNotEmpty({ message: 'companyId is required' })
  companyId: string;

  @IsString({ message: 'userId must be typeof string' })
  @IsNotEmpty({ message: 'userId is required' })
  userId: string;
}
