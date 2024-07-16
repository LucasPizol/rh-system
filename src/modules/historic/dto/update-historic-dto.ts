import { HistoricType } from '../interfaces/historic-type';

export class UpdateHistoricDTO {
  productId: string;
  type: HistoricType;
  quantity: number;
}
