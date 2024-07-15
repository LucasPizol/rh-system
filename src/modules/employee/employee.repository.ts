import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Operation } from 'src/protocols/operation';
import { EmployeeDTO } from './dto/employee.dto';

export abstract class EmployeeRepositoryBase {
  abstract createEmployee(
    data: EmployeeDTO,
    documentPhotoUrl: string,
  ): Promise<Employee>;
  abstract loadAll(companyId: string): Promise<Employee[]>;
  abstract update(
    operation: Operation,
    data: Partial<EmployeeDTO>,
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

  async loadAll(companyId: string): Promise<Employee[]> {
    return await this.prisma.employee.findMany({
      where: { companyId },
    });
  }

  async update(
    operation: Operation,
    data: Partial<EmployeeDTO>,
  ): Promise<Employee> {
    return await this.prisma.employee.update({
      where: { id: operation.id },
      data,
    });
  }
}
