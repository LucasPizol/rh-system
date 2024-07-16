import { Injectable } from '@nestjs/common';
import { Installments } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateInstallmentDTO } from './dto/create-installment.dto';

export abstract class InstallmentRepositoryBase {
  abstract createInstallments(
    data: CreateInstallmentDTO[],
  ): Promise<Installments[]>;
}

@Injectable()
export class InstallmentRepository implements InstallmentRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async createInstallments(
    data: CreateInstallmentDTO[],
  ): Promise<Installments[]> {
    return await this.prisma.installments.createManyAndReturn({ data });
  }
}
