import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

import {
  CustomerRepository,
  CustomerRepositoryBase,
} from '../customer/customer.repository';
import { CustomerService } from '../customer/customer.service';
import {
  InstallmentRepository,
  InstallmentRepositoryBase,
} from '../installments/installments.repository';
import { InstallmentService } from '../installments/instalments.service';
import { InvoiceService } from '../invoice/invoice.service';
import {
  PaymentMethodRepository,
  PaymentMethodRepositoryBase,
} from '../payment-method/payment-method.repository';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import {
  ProductOrderRepository,
  ProductOrderRepositoryBase,
} from '../product-order/product-order.repository';
import { ProductOrderService } from '../product-order/product-order.service';
import {
  ProductRepository,
  ProductRepositoryBase,
} from '../product/product.repository';
import { ProductService } from '../product/product.service';
import { OrderController } from './order.controller';
import { OrderRepository, OrderRepositoryBase } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    ProductService,
    PaymentMethodService,
    InstallmentService,
    InvoiceService,
    CustomerService,
    ProductOrderService,
    {
      provide: ProductRepositoryBase,
      useClass: ProductRepository,
    },
    {
      provide: OrderRepositoryBase,
      useClass: OrderRepository,
    },
    {
      provide: InstallmentRepositoryBase,
      useClass: InstallmentRepository,
    },
    {
      provide: PaymentMethodRepositoryBase,
      useClass: PaymentMethodRepository,
    },
    {
      provide: CustomerRepositoryBase,
      useClass: CustomerRepository,
    },
    {
      provide: ProductOrderRepositoryBase,
      useClass: ProductOrderRepository,
    },
  ],
})
export class OrderModule {}
