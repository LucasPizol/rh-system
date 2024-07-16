import { Injectable } from '@nestjs/common';
import { Historic } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Operation } from 'src/protocols/operation';
import { CreateHistoricDTO } from './dto/create-historic.dto';
import { UpdateHistoricDTO } from './dto/update-historic-dto';

export abstract class HistoricRepositoryBase {
  abstract create(data: CreateHistoricDTO): Promise<any>;
  abstract update(operation: Operation, data: UpdateHistoricDTO): Promise<any>;
  abstract delete(operation: Operation): Promise<void>;
  abstract findById(operation: Operation): Promise<any>;
  abstract findAll(companyId: string): Promise<any[]>;
}

@Injectable()
export class HistoricRepository implements HistoricRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHistoricDTO): Promise<Historic> {
    return await this.prisma.historic.create({ data: data as any });
  }

  async update(
    operation: Operation,
    data: UpdateHistoricDTO,
  ): Promise<Historic> {
    return await this.prisma.historic.update({
      where: operation,
      data: data as any,
    });
  }

  async delete(operation: Operation): Promise<void> {
    await this.prisma.historic.delete({ where: operation });
  }

  async findById(operation: Operation): Promise<Historic> {
    return await this.prisma.historic.findUnique({ where: operation });
  }

  async findAll(companyId: string): Promise<Historic[]> {
    return await this.prisma.historic.findMany({ where: { companyId } });
  }
}
