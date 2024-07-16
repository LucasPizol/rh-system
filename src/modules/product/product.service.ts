import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { Operation } from 'src/protocols/operation';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductRepositoryBase } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepositoryBase) {}

  async create(data: CreateProductDTO): Promise<Product> {
    return await this.productRepository.create(data);
  }

  async update(
    operation: Operation,
    data: Partial<UpdateProductDTO>,
  ): Promise<Product> {
    return await this.productRepository.update(operation, data);
  }

  async delete(operation: Operation): Promise<void> {
    return await this.productRepository.delete(operation);
  }

  async findById(operation: Operation): Promise<Product> {
    return await this.productRepository.findById(operation);
  }

  async findAll(companyId: string): Promise<Product[]> {
    return await this.productRepository.findAll(companyId);
  }
}
