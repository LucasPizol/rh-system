import { Injectable } from '@nestjs/common';
import { ProductOrder } from '@prisma/client';
import { Operation } from 'src/protocols/operation';
import { ProductOrderDTO } from './dto/product-order.dto';
import { ProductOrderRepositoryBase } from './product-order.repository';

@Injectable()
export class ProductOrderService {
  constructor(
    private readonly productOrderRepository: ProductOrderRepositoryBase,
  ) {}

  async createMany(data: ProductOrderDTO[]): Promise<ProductOrder[]> {
    return await this.productOrderRepository.createMany(data);
  }

  async findAll(companyId: string, orderId: string): Promise<ProductOrder[]> {
    return await this.productOrderRepository.findAll(companyId, orderId);
  }

  async delete(operation: Operation, orderId: string): Promise<void> {
    return await this.productOrderRepository.delete(operation, orderId);
  }

  async update(
    operation: Operation,
    orderId: string,
    data: Partial<ProductOrderDTO>,
  ): Promise<ProductOrder> {
    return await this.productOrderRepository.update(operation, orderId, data);
  }
}
