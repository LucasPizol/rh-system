import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { Operation } from 'src/protocols/operation';
import { UpdateHistoricDTO } from './dto/update-historic-dto';
import { HistoricRepositoryBase } from './historic.repository';
import { HistoricType } from './interfaces/historic-type';

@Injectable()
export class HistoricService {
  constructor(private readonly historicRepository: HistoricRepositoryBase) {}

  async create(
    product: Product,
    type: HistoricType,
    userId: string,
  ): Promise<any> {
    return await this.historicRepository.create({
      boughtPrice: product.boughtPrice,
      sellPrice: product.sellPrice,
      lastQuantity: product.quantity,
      companyId: product.companyId,
      productId: product.id,
      quantity: product.quantity,
      type,
      userId,
    });
  }

  async update(
    operation: Operation,
    data: UpdateHistoricDTO,
  ): Promise<Product> {
    return await this.historicRepository.update(operation, data);
  }

  async delete(operation: Operation): Promise<void> {
    await this.historicRepository.delete(operation);
  }

  async findById(operation: Operation): Promise<Product> {
    return await this.historicRepository.findById(operation);
  }

  async findAll(companyId: string): Promise<Product[]> {
    return await this.historicRepository.findAll(companyId);
  }
}
