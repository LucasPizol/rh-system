import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ContractController } from './contract.controller';
import {
  ContractRepository,
  ContractRepositoryBase,
} from './contract.repository';
import { ContractService } from './contract.service';

@Module({
  imports: [],
  controllers: [ContractController],
  providers: [
    PrismaService,
    ContractService,
    {
      provide: ContractRepositoryBase,
      useClass: ContractRepository,
    },
  ],
})
export class ContractModule {}
