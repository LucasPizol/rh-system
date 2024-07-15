import { Contract } from '@prisma/client';
import { ContractRepositoryBase } from './contract.repository';
import { CreateContractServiceDTO } from './dto/create-contract-service.dto';

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
}
