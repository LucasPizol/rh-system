import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Operation } from 'src/protocols/operation';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/invoice-order.dto';

export abstract class OrderRepositoryBase {
  abstract createOrder(data: CreateOrderDTO): Promise<Order>;
  abstract getOrders(companyId: string): Promise<Order[]>;
  abstract getOrderById(operation: Operation): Promise<Order>;
  abstract deleteOrder(operation: Operation): Promise<Order>;
  abstract updateOrder(
    operation: Operation,
    order: Partial<UpdateOrderDTO>,
  ): Promise<Order>;
}

@Injectable()
export class OrderRepository implements OrderRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(data: CreateOrderDTO): Promise<Order> {
    return await this.prisma.order.create({ data });
  }

  async getOrders(companyId: string): Promise<Order[]> {
    return await this.prisma.order.findMany({ where: { companyId } });
  }

  async getOrderById(operation: Operation): Promise<Order> {
    return await this.prisma.order.findUnique({ where: operation });
  }

  async deleteOrder(operation: Operation): Promise<Order> {
    return await this.prisma.order.delete({ where: operation });
  }

  async updateOrder(
    operation: Operation,
    data: Partial<UpdateOrderDTO>,
  ): Promise<Order> {
    return await this.prisma.order.update({ where: operation, data });
  }
}
