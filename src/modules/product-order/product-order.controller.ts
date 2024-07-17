import { Body, Controller, Param, Put, Request } from '@nestjs/common';
import { HttpRequest } from 'src/security/auth-guard';
import { ProductOrderDTO } from './dto/product-order.dto';
import { ProductOrderService } from './product-order.service';

@Controller('product-order')
export class ProductOrderController {
  constructor(private readonly productOrderService: ProductOrderService) {}

  @Put(':id')
  async createMany(
    @Body() data: ProductOrderDTO,
    @Param('id') id: string,
    @Request() req: HttpRequest,
  ) {
    return await this.productOrderService.update(
      { companyId: req.user.companyId, id },
      data.orderId,
      data,
    );
  }
}
