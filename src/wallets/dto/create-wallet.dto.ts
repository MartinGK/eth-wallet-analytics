import { IsNotEmpty, IsString, IsEthereumAddress } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  address: string;
}
