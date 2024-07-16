import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { HttpRequest } from 'src/security/auth-guard';
import { CreateProductRequestDTO } from './dto/create-product-request.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() data: CreateProductRequestDTO,
    @Request() req: HttpRequest,
  ): Promise<Product> {
    return await this.productService.create({
      ...data,
      companyId: req.user.companyId,
    });
  }

  @Get()
  async getProducts(@Request() req: HttpRequest): Promise<Product[]> {
    return await this.productService.findAll(req.user.companyId);
  }

  @Put(':id')
  async updateProduct(
    @Request() req: HttpRequest,
    @Body() data: UpdateProductDTO,
    @Param('id') id: string,
  ): Promise<Product> {
    return await this.productService.update(
      { id, companyId: req.user.companyId },
      data,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(
    @Request() req: HttpRequest,
    @Param('id') id: string,
  ): Promise<void> {
    return await this.productService.delete({
      id,
      companyId: req.user.companyId,
    });
  }

  @Get(':id')
  async getProductById(
    @Request() req: HttpRequest,
    @Param('id') id: string,
  ): Promise<Product> {
    return await this.productService.findById({
      id,
      companyId: req.user.companyId,
    });
  }
}
