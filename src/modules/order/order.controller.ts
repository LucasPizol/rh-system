import { Body, Controller, Param, Post, Put, Request } from '@nestjs/common';
import { HttpRequest } from 'src/security/auth-guard';
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
    return await this.orderService.createOrder({
      ...data,
      companyId: req.user.companyId,
      userId: req.user.id,
    });
  }

  @Put('invoice/:id')
  async invoiceOrder(@Request() req: HttpRequest, @Param('id') id: string) {
    return await this.orderService.invoceOrder({
      companyId: req.user.companyId,
      id,
    });
  }
}
