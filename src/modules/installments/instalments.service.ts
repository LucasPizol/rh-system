import { Injectable } from '@nestjs/common';
import { Order, PaymentMethod } from '@prisma/client';
import { CreateInstallmentDTO } from './dto/create-installment.dto';
import { InstallmentRepositoryBase } from './installments.repository';

@Injectable()
export class InstallmentService {
  constructor(
    private readonly installmentRepository: InstallmentRepositoryBase,
  ) {}

  async createInstallment(paymentMethod: PaymentMethod, order: Order) {
    const installments: CreateInstallmentDTO[] =
      paymentMethod.expirationDays.map((expirationDay) => {
        const expirationDate = new Date();
        expirationDate.setHours(0, 0, 0, 0);
        expirationDate.setDate(expirationDate.getDate() + expirationDay);

        return {
          value: parseFloat(
            (order.value / paymentMethod.expirationDays.length).toFixed(2),
          ),
          expiresIn: expirationDate,
          orderId: order.id,
        };
      });

    return await this.installmentRepository.createInstallments(installments);
  }
}
