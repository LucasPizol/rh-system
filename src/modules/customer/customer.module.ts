import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CustomerController } from './customer.controller';
import {
  CustomerRepository,
  CustomerRepositoryBase,
} from './customer.repository';
import { CustomerService } from './customer.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PrismaService,
    {
      provide: CustomerRepositoryBase,
      useClass: CustomerRepository,
    },
  ],
  exports: [],
})
export class CustomerModule {}
