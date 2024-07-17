import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCustomerRequestDTO } from './create-customer-request-dto';

export class CreateCustomerDTO extends CreateCustomerRequestDTO {
  @IsString({ message: 'companyId must be typeof string' })
  @IsNotEmpty({ message: 'companyId is required' })
  companyId: string;
}
