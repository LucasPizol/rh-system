import { IsNotEmpty } from 'class-validator';
import { CreateOrderRequestDTO } from './create-order-request.dto';

export class CreateOrderDTO extends CreateOrderRequestDTO {
  @IsNotEmpty({ message: 'isInvoice is required' })
  isInvoice: boolean;

  @IsNotEmpty({ message: 'userId is required' })
  userId: string;

  @IsNotEmpty({ message: 'companyId is required' })
  companyId: string;

  invocedAt: Date | null;
}
