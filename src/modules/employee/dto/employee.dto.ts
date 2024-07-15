import { IsNotEmpty } from 'class-validator';

export class EmployeeDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'Document is required' })
  document: string;

  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @IsNotEmpty({ message: 'Department is required' })
  departmentId: string;

  @IsNotEmpty({ message: 'Company is required' })
  companyId: string;
}
