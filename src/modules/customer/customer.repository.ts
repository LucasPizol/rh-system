import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Operation } from 'src/protocols/operation';
import { CreateCustomerRequestDTO } from './dto/create-customer-request-dto';
import { CreateCustomerDTO } from './dto/create-customer.dto';

export abstract class CustomerRepositoryBase {
  abstract createCustomer(data: CreateCustomerDTO): Promise<Customer>;
  abstract getCustomerById(operation: Operation): Promise<Customer | null>;
  abstract getCustomerByCode(where: {
    code: number;
    companyId: string;
  }): Promise<Customer | null>;
  abstract getCustomers(companyId: string): Promise<Customer[]>;

  abstract updateCustomer(
    operation: Operation,
    data: Partial<CreateCustomerRequestDTO>,
  ): Promise<Customer>;

  abstract delete(operation: Operation): Promise<void>;
}

@Injectable()
export class CustomerRepository implements CustomerRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async createCustomer(data: CreateCustomerDTO): Promise<Customer> {
    return await this.prisma.customer.create({ data });
  }

  async getCustomerById(operation: Operation): Promise<Customer | null> {
    return await this.prisma.customer.findUnique({ where: operation });
  }

  async getCustomerByCode(where: {
    code: number;
    companyId: string;
  }): Promise<Customer | null> {
    return await this.prisma.customer.findUnique({ where });
  }

  async getCustomers(companyId: string): Promise<Customer[]> {
    return await this.prisma.customer.findMany({ where: { companyId } });
  }

  async updateCustomer(
    operation: Operation,
    data: Partial<CreateCustomerRequestDTO>,
  ): Promise<Customer> {
    return await this.prisma.customer.update({ where: operation, data });
  }

  async delete(operation: Operation): Promise<void> {
    await this.prisma.customer.delete({ where: operation });
  }
}
