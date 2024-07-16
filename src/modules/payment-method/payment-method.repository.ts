import { Injectable } from '@nestjs/common';
import { PaymentMethod } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePaymentMethodDTO } from './dto/create-payment-method.dto';

export abstract class PaymentMethodRepositoryBase {
  abstract createPaymentMethod(
    data: CreatePaymentMethodDTO,
  ): Promise<PaymentMethod>;
  abstract findById(id: string): Promise<PaymentMethod>;
}

@Injectable()
export class PaymentMethodRepository implements PaymentMethodRepositoryBase {
  constructor(private readonly prisma: PrismaService) {}

  async createPaymentMethod(
    data: CreatePaymentMethodDTO,
  ): Promise<PaymentMethod> {
    return await this.prisma.paymentMethod.create({ data });
  }

  async findById(id: string) {
    return await this.prisma.paymentMethod.findUnique({ where: { id } });
  }
}
