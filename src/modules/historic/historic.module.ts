import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  ProductRepository,
  ProductRepositoryBase,
} from '../product/product.repository';
import { ProductService } from '../product/product.service';
import { HistoricController } from './historic.controller';
import {
  HistoricRepository,
  HistoricRepositoryBase,
} from './historic.repository';
import { HistoricService } from './historic.service';

@Module({
  imports: [],
  controllers: [HistoricController],
  providers: [
    PrismaService,
    HistoricService,
    ProductService,
    {
      provide: HistoricRepositoryBase,
      useClass: HistoricRepository,
    },
    {
      provide: ProductRepositoryBase,
      useClass: ProductRepository,
    },
  ],
  exports: [],
})
export class HistoricModule {}
