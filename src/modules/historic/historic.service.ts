import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { Operation } from 'src/protocols/operation';
import { ProductService } from '../product/product.service';
import { CreateHistoricRequestDTO } from './dto/create-historic-request.dto';
import { UpdateHistoricDTO } from './dto/update-historic-dto';
import { HistoricRepositoryBase } from './historic.repository';
import { HistoricType } from './interfaces/historic-type';

@Injectable()
export class HistoricService {
  constructor(
    private readonly historicRepository: HistoricRepositoryBase,
    private readonly productService: ProductService,
  ) {}

  async create(data: CreateHistoricRequestDTO): Promise<any> {
    const product = await this.checkProductQuantity(
      data.productId,
      data.companyId,
      data.quantity,
      data.type,
    );

    this.updateProductQuantity(product, data.quantity, data.type);

    return await this.historicRepository.create({
      ...data,
      boughtPrice: product.boughtPrice,
      sellPrice: product.sellPrice,
      lastQuantity: product.quantity,
    });
  }

  async update(
    operation: Operation,
    data: UpdateHistoricDTO,
  ): Promise<Product> {
    return await this.historicRepository.update(operation, data);
  }

  async delete(operation: Operation): Promise<void> {
    const historic = await this.historicRepository.findById(operation);

    const product = await this.productService.findById({
      id: historic.productId,
      companyId: historic.companyId,
    });

    this.updateProductQuantity(
      product,
      historic.quantity,
      historic.type === HistoricType.INPUT
        ? HistoricType.OUTPUT
        : HistoricType.INPUT,
    );

    await this.historicRepository.delete(operation);
  }

  async findById(operation: Operation): Promise<Product> {
    return await this.historicRepository.findById(operation);
  }

  async findAll(companyId: string): Promise<Product[]> {
    return await this.historicRepository.findAll(companyId);
  }

  private async updateProductQuantity(
    product: Product,
    quantity: number,
    type: HistoricType,
  ): Promise<void> {
    await this.productService.update(
      { id: product.id, companyId: product.companyId },
      {
        quantity:
          type === HistoricType.INPUT
            ? product.quantity + quantity
            : product.quantity - quantity,
      },
    );
  }

  private async checkProductQuantity(
    productId: string,
    companyId: string,
    quantity: number,
    type: HistoricType,
  ): Promise<Product> {
    const product = await this.productService.findById({
      id: productId,
      companyId,
    });

    if (!product) throw new NotFoundException('Product not found');

    if (product.quantity < quantity && type === HistoricType.OUTPUT)
      throw new ForbiddenException('Quantity not available');

    return product;
  }
}
