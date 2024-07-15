import { Injectable } from '@nestjs/common';
import { Operation } from 'src/protocols/operation';
import { DepartmentRepositoryBase } from './department.repository';
import { CreateDepartmentDTO } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly departmentRepository: DepartmentRepositoryBase,
  ) {}

  async create(data: CreateDepartmentDTO) {
    return await this.departmentRepository.create(data);
  }

  async loadAll(companyId: string) {
    return await this.departmentRepository.loadAll(companyId);
  }

  async update(operation: Operation, data: Partial<CreateDepartmentDTO>) {
    return await this.departmentRepository.update(operation, data);
  }

  async delete(operation: Operation) {
    return await this.departmentRepository.delete(operation);
  }
}
