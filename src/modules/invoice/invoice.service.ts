import { Installments, Order } from '@prisma/client';

export class InvoiceService {
  async createInvoice(order: Order, installments: Installments[]) {
    return new Promise<{
      url: string;
      number: string;
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          url: 'https://invoice.com',
          number: Math.floor(Math.random() * 1000000).toString(),
        });
      }, 2000);
    });
  }
}
