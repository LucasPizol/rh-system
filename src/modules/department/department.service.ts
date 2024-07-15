import { Injectable } from '@nestjs/common';
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
}
