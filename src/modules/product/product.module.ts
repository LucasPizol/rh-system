import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProductController } from './product.controller';
import { ProductRepository, ProductRepositoryBase } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    ProductService,
    {
      provide: ProductRepositoryBase,
      useClass: ProductRepository,
    },
  ],
  exports: [],
})
export class ProductModule {}
