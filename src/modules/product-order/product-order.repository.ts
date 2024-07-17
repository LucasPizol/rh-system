import { Injectable } from '@nestjs/common';
import { ProductOrder } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Operation } from 'src/protocols/operation';
import { ProductOrderDTO } from './dto/product-order.dto';

export abstract class ProductOrderRepositoryBase {
  abstract createMany(data: ProductOrderDTO[]): Promise<ProductOrder[]>;
  abstract findAll(companyId: string, orderId: string): Promise<ProductOrder[]>;
  abstract delete(operation: Operation, orderId: string): Promise<void>;
  abstract update(
    operation: Operation,
    orderId: string,
    data: Partial<ProductOrderDTO>,
  ): Promise<ProductOrder>;
}

@Injectable()
export class ProductOrderRepository implements ProductOrderRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(data: ProductOrderDTO[]): Promise<ProductOrder[]> {
    return await this.prisma.productOrder.createManyAndReturn({ data });
  }
  async findAll(companyId: string, orderId: string): Promise<ProductOrder[]> {
    return await this.prisma.productOrder.findMany({
      where: {
        orderId,
        order: { companyId },
      },
    });
  }
  async delete(operation: Operation, orderId: string): Promise<void> {
    await this.prisma.productOrder.delete({
      where: { ...operation, orderId },
    });
  }
  async update(
    operation: Operation,
    orderId: string,
    data: Partial<ProductOrderDTO>,
  ): Promise<ProductOrder> {
    return await this.prisma.productOrder.update({
      where: { ...operation, orderId },
      data,
    });
  }
}
