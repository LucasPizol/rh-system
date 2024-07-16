export class UpdateProductDTO {
  name: string;
  description: string | null;
  barcode: string | null;
  quantity: number;
  minQuantity: number;
  boughtPrice: number;
  sellPrice: number;
  weight: number;
  batchNumber: string | null;
  unit: string;
  category: string;
  isOwner: boolean;
  location: string | null;
  validationDate: Date | null;
  companyId: string;
}
