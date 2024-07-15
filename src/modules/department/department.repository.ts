import { Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Operation } from 'src/protocols/operation';
import { CreateDepartmentDTO } from './dto/create-department.dto';

export abstract class DepartmentRepositoryBase {
  abstract create(data: CreateDepartmentDTO): Promise<Department>;
  abstract loadAll(companyId: string): Promise<Department[]>;
  abstract update(
    operation: Operation,
    data: Partial<CreateDepartmentDTO>,
  ): Promise<Department>;
  abstract delete(operation: Operation): Promise<Department>;
}

@Injectable()
export class DepartmentRepository implements DepartmentRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDepartmentDTO): Promise<Department> {
    return await this.prisma.department.create({ data });
  }

  async loadAll(companyId: string): Promise<Department[]> {
    return await this.prisma.department.findMany({
      where: { companyId },
    });
  }

  async update(
    operation: Operation,
    data: Partial<CreateDepartmentDTO>,
  ): Promise<Department> {
    return await this.prisma.department.update({
      where: operation,
      data,
    });
  }

  async delete(operation: Operation): Promise<Department> {
    return await this.prisma.department.delete({
      where: operation,
    });
  }
}
