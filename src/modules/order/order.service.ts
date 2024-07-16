import { Injectable, NotFoundException } from '@nestjs/common';
import { Operation } from 'src/protocols/operation';
import { ProductService } from '../product/product.service';
import { CreateOrderServiceDTO } from './dto/create-order-service.dto';
import { OrderRepositoryBase } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryBase,
    private readonly productService: ProductService,
  ) {}

  async createOrder(data: CreateOrderServiceDTO) {
    const product = await this.productService.findById({
      id: data.productId,
      companyId: data.companyId,
    });

    if (!product) throw new NotFoundException('Product not found');

    const order = await this.orderRepository.createOrder({
      ...data,
      productSellPrice: product.sellPrice,
      productBoughtPrice: product.boughtPrice,
    });

    return order;
  }

  async invoceOrder(operation: Operation) {
    const order = await this.orderRepository.getOrderById(operation);

    if (!order) throw new NotFoundException('Order not found');

    const invoice = await new Promise<{
      url: string;
      number: string;
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          url: 'https://invoice.com',
          number: Math.floor(Math.random() * 1000000).toString(),
        });
      }, 2000);
    });

    const invoicedOrder = await this.orderRepository.updateOrder(operation, {
      isInvoice: true,
      invoicedAt: new Date(),
      invoiceUrl: invoice.url,
      invoiceNumber: invoice.number,
    });

    return invoicedOrder;
  }
}
