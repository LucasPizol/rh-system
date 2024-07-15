import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentRequestDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
