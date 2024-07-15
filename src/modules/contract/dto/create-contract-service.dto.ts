import { IsNotEmpty } from 'class-validator';

export class CreateContractServiceDTO {
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: string;

  endDate: Date | null;
  interrupmentDate: Date | null;

  @IsNotEmpty({ message: 'Start Date is required' })
  startDate: Date;

  @IsNotEmpty({ message: 'Role is required' })
  role: string;

  @IsNotEmpty({ message: 'Type is required' })
  type: string;

  @IsNotEmpty({ message: 'Sallary is required' })
  sallary: number;

  @IsNotEmpty({ message: 'Hours is required' })
  hours: number;

  @IsNotEmpty({ message: 'HoursType is required' })
  hoursType: string;

  description: string | null;
  companyId: string;
}
