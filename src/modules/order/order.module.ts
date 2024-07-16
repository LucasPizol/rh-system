import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
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
    {
      provide: ProductRepositoryBase,
      useClass: ProductRepository,
    },
    {
      provide: OrderRepositoryBase,
      useClass: OrderRepository,
    },
  ],
})
export class OrderModule {}
