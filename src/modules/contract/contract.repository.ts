import { Injectable } from '@nestjs/common';
import { Contract } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Operation } from 'src/protocols/operation';
import { CreateContractDTO } from './dto/create-contract.dto';

export abstract class ContractRepositoryBase {
  abstract createContract(
    createContractDTO: CreateContractDTO,
  ): Promise<Contract>;
  abstract loadAll(operation: Operation): Promise<Contract[]>;

  abstract interruptContract(operation: Operation): Promise<Contract>;
}
@Injectable()
export class ContractRepository implements ContractRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async createContract(data: CreateContractDTO): Promise<Contract> {
    await this.prisma.contract.updateMany({
      where: {
        employeeId: data.employeeId,
        companyId: data.companyId,
        endDate: null,
      },
      data: {
        endDate: new Date(),
        interrupmentDate: new Date(),
      },
    });

    return await this.prisma.contract.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
      },
    });
  }

  async loadAll(operation: Operation): Promise<Contract[]> {
    return await this.prisma.contract.findMany({
      where: { companyId: operation.companyId, employeeId: operation.id },
    });
  }

  async interruptContract(operation: Operation): Promise<Contract> {
    return await this.prisma.contract.update({
      where: {
        id: operation.id,
        companyId: operation.companyId,
      },
      data: {
        endDate: new Date(),
        interrupmentDate: new Date(),
      },
    });
  }
}
