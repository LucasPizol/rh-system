import { Injectable } from '@nestjs/common';
import { Operation } from 'src/protocols/operation';
import { CustomerRepositoryBase } from './customer.repository';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepositoryBase) {}

  async createCustomer(data: CreateCustomerDTO) {
    return await this.customerRepository.createCustomer(data);
  }

  async getCustomerById(operation: Operation) {
    return await this.customerRepository.getCustomerById(operation);
  }

  async getCustomerByCode(where: { code: number; companyId: string }) {
    return await this.customerRepository.getCustomerByCode(where);
  }

  async getCustomers(companyId: string) {
    return await this.customerRepository.getCustomers(companyId);
  }

  async updateCustomer(operation: Operation, data: Partial<CreateCustomerDTO>) {
    return await this.customerRepository.updateCustomer(operation, data);
  }

  async delete(operation: Operation) {
    return await this.customerRepository.delete(operation);
  }
}
