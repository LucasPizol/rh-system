import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { EmployeeDTO } from './dto/employee.dto';

export abstract class EmployeeRepositoryBase {
  abstract createEmployee(
    data: EmployeeDTO,
    documentPhotoUrl: string,
  ): Promise<Employee>;
}

@Injectable()
export class EmployeeRepository implements EmployeeRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(
    data: EmployeeDTO,
    documentPhotoUrl: string,
  ): Promise<Employee> {
    return await this.prisma.employee.create({
      data: {
        ...data,
        documentPhotoUrl,
      },
    });
  }
}
