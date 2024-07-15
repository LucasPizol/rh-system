import { Contract } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContractDTO } from './dto/create-contract.dto';

export abstract class ContractRepositoryBase {
  abstract createContract(
    createContractDTO: CreateContractDTO,
  ): Promise<Contract>;
}

export class ContractRepository implements ContractRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async createContract(data: CreateContractDTO): Promise<Contract> {
    return await this.prisma.contract.create({ data });
  }
}
