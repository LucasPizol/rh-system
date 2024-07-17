import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Operation } from 'src/protocols/operation';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

export abstract class ProductRepositoryBase {
  abstract create(data: CreateProductDTO): Promise<Product>;
  abstract update(
    operation: Operation,
    data: Partial<UpdateProductDTO>,
  ): Promise<Product>;
  abstract delete(operation: Operation): Promise<void>;
  abstract findById(operation: Operation): Promise<Product>;
  abstract findAll(companyId: string): Promise<Product[]>;
  abstract updateStock(
    operation: Operation,
    quantity: number,
  ): Promise<Product>;
  abstract findManyByIds(ids: string[], companyId: string): Promise<Product[]>;
}

@Injectable()
export class ProductRepository implements ProductRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDTO): Promise<Product> {
    return await this.prisma.product.create({ data });
  }

  async update(
    operation: Operation,
    data: Partial<UpdateProductDTO>,
  ): Promise<Product> {
    return await this.prisma.product.update({ where: operation, data });
  }

  async delete(operation: Operation): Promise<void> {
    await this.prisma.product.update({
      where: operation,
      data: { isDisabled: true, disabledAt: new Date() },
    });
  }

  async findById(operation: Operation): Promise<Product> {
    return await this.prisma.product.findUnique({ where: operation });
  }

  async findAll(companyId: string): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: { companyId, isDisabled: false },
    });
  }

  async updateStock(operation: Operation, quantity: number): Promise<Product> {
    return await this.prisma.product.update({
      where: operation,
      data: { quantity: { increment: quantity } },
    });
  }

  async findManyByIds(ids: string[], companyId: string): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: { id: { in: ids }, companyId },
    });
  }
}
