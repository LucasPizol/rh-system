import { Body, Controller, Post } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { EmployeeDTO } from './dto/emplyee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() data: EmployeeDTO): Promise<Employee> {
    return await this.employeeService.createEmployee(data);
  }
}
