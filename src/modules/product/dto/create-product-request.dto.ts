import { IsNotEmpty } from 'class-validator';

export class CreateProductRequestDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  description: string | null;

  barcode: string | null;

  @IsNotEmpty({ message: 'quantity is required' })
  quantity: number;

  minQuantity: number;
  boughtPrice: number;
  sellPrice: number;

  weight: number;

  batchNumber: string | null;

  @IsNotEmpty({ message: 'unit is required' })
  unit: string;

  @IsNotEmpty({ message: 'category is required' })
  category: string;

  @IsNotEmpty({ message: 'isOwner is required' })
  isOwner: boolean;

  location: string | null;
  validationDate: Date | null;
}
