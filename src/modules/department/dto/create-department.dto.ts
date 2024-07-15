import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Company is required' })
  companyId: string;
}
