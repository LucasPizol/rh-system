import { Injectable } from '@nestjs/common';
import { Contract } from '@prisma/client';
import { Operation } from 'src/protocols/operation';
import { ContractRepositoryBase } from './contract.repository';
import { CreateContractServiceDTO } from './dto/create-contract-service.dto';

@Injectable()
export class ContractService {
  constructor(private readonly contractRepository: ContractRepositoryBase) {}

  async createContract(data: CreateContractServiceDTO): Promise<Contract> {
    const fakeUrl = 'https://www.example.com/contract.pdf';

    return await this.contractRepository.createContract({
      ...data,
      contractUrl: fakeUrl,
      url: fakeUrl,
    });
  }

  async loadAll(operation: Operation): Promise<Contract[]> {
    return await this.contractRepository.loadAll(operation);
  }

  async interruptContract(operation: Operation): Promise<Contract> {
    return await this.contractRepository.interruptContract(operation);
  }
}
