import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Operation } from 'src/protocols/operation';

import { User } from '@prisma/client';
import { CustomerService } from '../customer/customer.service';
import { InstallmentService } from '../installments/instalments.service';
import { InvoiceService } from '../invoice/invoice.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { ProductOrderDTO } from '../product-order/dto/product-order.dto';
import { ProductOrderService } from '../product-order/product-order.service';
import { ProductService } from '../product/product.service';
import { CreateOrderRequestDTO } from './dto/create-order-request.dto';
import { OrderType } from './enum/OrderType';
import { OrderRepositoryBase } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryBase,
    private readonly productService: ProductService,
    private readonly installmentService: InstallmentService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly invoiceService: InvoiceService,
    private readonly customerService: CustomerService,
    private readonly productOrderService: ProductOrderService,
  ) {}

  async createOrder(data: CreateOrderRequestDTO, user: User) {
    if (data.type === OrderType.SALE && !data.customerId)
      throw new ForbiddenException('Customer id is required');

    const [customer, products, paymentMethod] = await Promise.all([
      this.customerService.getCustomerById({
        id: data.customerId,
        companyId: user.companyId,
      }),
      this.productService.findManyByIds(data.products, user.companyId),
      this.paymentMethodService.findById(data.paymentMethodId),
    ]);

    if (products.length < data.products.length) {
      const notFoundProducts = data.products.filter(
        (product) => !products.find((p) => p.id === product),
      );

      throw new NotFoundException({
        message: 'Product not found',
        data: notFoundProducts,
      });
    }

    if (!products.length) throw new NotFoundException('Product not found');
    if (!paymentMethod) throw new NotFoundException('Payment method not found');
    if (!customer) throw new NotFoundException('Customer not found');

    return await this.orderRepository.createOrder({
      ...data,
      isInvoice: data.invoiceNumber ? true : false,
      invocedAt: data.invoiceNumber ? new Date() : null,
      companyId: user.companyId,
      userId: user.id,
    });
  }

  async invoceOrder(operation: Operation) {
    const order = await this.orderRepository.getOrderById(operation);

    if (!order) throw new NotFoundException('Order not found');

    const product = await this.productService.findById({
      id: order.productId,
      companyId: order.companyId,
    });

    if (!product) throw new NotFoundException('Product not found');
    if (order.isInvoice) throw new ForbiddenException('Order already invoiced');

    this.verifyQuantity(product.quantity, order.quantity);

    const paymentMethod = await this.paymentMethodService.findById(
      order.paymentMethodId,
    );

    if (!paymentMethod) throw new NotFoundException('Payment method not found');

    const installments = await this.installmentService.createInstallment(
      paymentMethod,
      order,
    );

    const { id, companyId } = product;

    const [invoice, _] = await Promise.all([
      this.invoiceService.createInvoice(order, installments),
      this.productService.updateStock({ id, companyId }, -order.quantity),
    ]);

    const invoicedOrder = await this.orderRepository.updateOrder(operation, {
      isInvoice: true,
      invoicedAt: new Date(),
      invoiceUrl: invoice.url,
      invoiceNumber: invoice.number,
    });

    return { ...invoicedOrder, installments };
  }

  async addProductOrderToOrder(operation: Operation, data: ProductOrderDTO) {
    const [order, product] = await Promise.all([
      this.orderRepository.getOrderById(operation),
      this.productService.findById({
        id: data.productId,
        companyId: operation.companyId,
      }),
    ]);

    if (!order) throw new NotFoundException('Order not found');
    if (!product) throw new NotFoundException('Product not found');

    this.verifyQuantity(product.quantity, data.quantity);

    return await this.productOrderService.createMany([data]);
  }

  private verifyQuantity(productQuantity: number, orderQuantity: number) {
    if (productQuantity < orderQuantity)
      throw new ForbiddenException({
        message: 'Insufficient stock',
        data: {
          availableStock: productQuantity,
          requestQuantity: orderQuantity,
          difference: -(orderQuantity - productQuantity),
        },
      });
  }
}
