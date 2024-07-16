import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateOrderDTO {
  @IsBoolean({ message: 'isInvoice must be typeof boolean' })
  isInvoice: boolean;

  @IsDate({ message: 'invoicedAt must be typeof date' })
  invoicedAt: Date;

  @IsString({ message: 'invoiceNumber must be typeof number' })
  invoiceNumber: string;

  @IsString({ message: 'invoiceUrl must be typeof string' })
  invoiceUrl: string;

  @IsBoolean({ message: 'isPaid must be typeof boolean' })
  isPaid: boolean;

  @IsDate({ message: 'paidAt must be typeof date' })
  paidAt: Date;
}
