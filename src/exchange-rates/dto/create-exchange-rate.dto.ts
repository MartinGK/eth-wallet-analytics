import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateExchangeRateDto {
  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  rate: number;
}
