import { Body, Controller, Post, Request } from '@nestjs/common';
import { Contract } from '@prisma/client';
import { HttpRequest } from 'src/security/auth-guard';
import { ContractService } from './contract.service';
import { CreateContractServiceDTO } from './dto/create-contract-service.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  async createContract(
    @Body() data: CreateContractServiceDTO,
    @Request() req: HttpRequest,
  ): Promise<Contract> {
    const user = req.user;

    return await this.contractService.createContract({
      ...data,
      companyId: user.companyId,
    });
  }
}
