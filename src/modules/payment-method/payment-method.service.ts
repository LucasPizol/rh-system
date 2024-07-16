import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDTO } from './dto/create-payment-method.dto';
import { PaymentMethodRepositoryBase } from './payment-method.repository';

@Injectable()
export class PaymentMethodService {
  constructor(
    private readonly paymentMethodRepository: PaymentMethodRepositoryBase,
  ) {}

  async createPaymentMethod(data: CreatePaymentMethodDTO) {
    return await this.paymentMethodRepository.createPaymentMethod(data);
  }

  async findById(id: string) {
    return await this.paymentMethodRepository.findById(id);
  }
}
