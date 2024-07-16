import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  HistoricRepository,
  HistoricRepositoryBase,
} from '../historic/historic.repository';
import { HistoricService } from '../historic/historic.service';
import { ProductController } from './product.controller';
import { ProductRepository, ProductRepositoryBase } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    ProductService,
    HistoricService,
    {
      provide: ProductRepositoryBase,
      useClass: ProductRepository,
    },
    {
      provide: HistoricRepositoryBase,
      useClass: HistoricRepository,
    },
  ],
  exports: [],
})
export class ProductModule {}
