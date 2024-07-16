import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Operation } from 'src/protocols/operation';
import { HistoricService } from '../historic/historic.service';
import { HistoricType } from '../historic/interfaces/historic-type';
import { InstallmentService } from '../installments/instalments.service';
import { InvoiceService } from '../invoice/invoice.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { ProductService } from '../product/product.service';
import { CreateOrderServiceDTO } from './dto/create-order-service.dto';
import { OrderRepositoryBase } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryBase,
    private readonly productService: ProductService,
    private readonly installmentService: InstallmentService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly invoiceService: InvoiceService,
    private readonly historicService: HistoricService,
  ) {}

  async createOrder(data: CreateOrderServiceDTO) {
    const product = await this.productService.findById({
      id: data.productId,
      companyId: data.companyId,
    });

    if (!product) throw new NotFoundException('Product not found');

    const paymentMethod = await this.paymentMethodService.findById(
      data.paymentMethodId,
    );

    if (!paymentMethod) throw new NotFoundException('Payment method not found');

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
      this.historicService.create(
        {
          ...product,
          quantity: order.quantity,
        },
        HistoricType.OUTPUT,
        order.userId,
      ),
    ]);

    const invoicedOrder = await this.orderRepository.updateOrder(operation, {
      isInvoice: true,
      invoicedAt: new Date(),
      invoiceUrl: invoice.url,
      invoiceNumber: invoice.number,
    });

    return { ...invoicedOrder, installments };
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
  }
}
