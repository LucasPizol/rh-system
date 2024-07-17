import { Body, Controller, Param, Post, Put, Request } from '@nestjs/common';
import { HttpRequest } from 'src/security/auth-guard';
import { ProductOrderDTO } from '../product-order/dto/product-order.dto';
import { CreateOrderRequestDTO } from './dto/create-order-request.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Request() req: HttpRequest,
    @Body() data: CreateOrderRequestDTO,
  ) {
    return await this.orderService.createOrder(data, req.user);
  }

  @Put('invoice/:id')
  async invoiceOrder(@Request() req: HttpRequest, @Param('id') id: string) {
    return await this.orderService.invoceOrder({
      companyId: req.user.companyId,
      id,
    });
  }

  @Post('product')
  async addProduct(@Request() req: HttpRequest, @Body() data: ProductOrderDTO) {
    return await this.orderService.addProductOrderToOrder(
      { companyId: req.user.companyId, id: data.orderId },
      data,
    );
  }
}
