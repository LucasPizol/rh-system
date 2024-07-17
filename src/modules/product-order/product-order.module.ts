import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProductOrderController } from './product-order.controller';
import {
  ProductOrderRepository,
  ProductOrderRepositoryBase,
} from './product-order.repository';
import { ProductOrderService } from './product-order.service';

@Module({
  imports: [],
  controllers: [ProductOrderController],
  providers: [
    ProductOrderService,
    PrismaService,
    {
      provide: ProductOrderRepositoryBase,
      useClass: ProductOrderRepository,
    },
  ],
})
export class ProductOrderModule {}
