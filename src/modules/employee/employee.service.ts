import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { EmployeeDTO } from './dto/employee.dto';
import { EmployeeRepositoryBase } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepositoryBase) {}

  async createEmployee(data: EmployeeDTO): Promise<Employee> {
    const photoUrl = 'https://www.example.com/photo.jpg';

    return await this.employeeRepository.createEmployee(data, photoUrl);
  }
}
