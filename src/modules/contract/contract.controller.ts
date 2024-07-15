import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
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

  @Get('/:employeeId')
  async loadAll(
    @Request() req: HttpRequest,
    @Param('employeeId') employeeId: string,
  ): Promise<Contract[]> {
    const user = req.user;

    return await this.contractService.loadAll({
      id: employeeId,
      companyId: user.companyId,
    });
  }

  @Patch('/:id')
  async interruptContract(
    @Body() data: Partial<CreateContractServiceDTO>,
    @Request() req: HttpRequest,
    @Param('id') id: string,
  ): Promise<Contract> {
    const user = req.user;

    return await this.contractService.interruptContract({
      id,
      companyId: user.companyId,
    });
  }
}
