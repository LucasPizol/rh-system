import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerRequestDTO {
  @IsString({ message: 'name must be typeof string' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsString({ message: 'email must be typeof string' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsString({ message: 'addressId must be typeof string' })
  @IsNotEmpty({ message: 'addressId is required' })
  addressId: string;

  @IsString({ message: 'cnpj must be typeof string' })
  @IsNotEmpty({ message: 'cnpj is required' })
  cnpj: string;

  @IsString({ message: 'cpf must be typeof string' })
  @IsNotEmpty({ message: 'cpf is required' })
  cpf: string;

  @IsString({ message: 'phone must be typeof string' })
  @IsNotEmpty({ message: 'phone is required' })
  phone: string;

  description?: string;
  contractUrl?: string;
}
