import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { Wallet } from '../entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all wallets', type: [Wallet] })
  async getAllWallets(): Promise<Wallet[]> {
    return await this.walletsService.getAllWallets();
  }

  @Post()
  @ApiBody({ type: CreateWalletDto })
  @ApiResponse({ status: 201, description: 'Add a wallet', type: Wallet })
  async addWallet(@Body() walletData: CreateWalletDto): Promise<Wallet> {
    return await this.walletsService.addWallet(walletData);
  }

  @Put(':id/favorite')
  @ApiParam({ name: 'id', description: 'Fav a Wallet' })
  @ApiResponse({ status: 200, description: 'Toggle favorite wallet', type: Wallet })
  async toggleFavoriteWallet(@Param('id') id: string): Promise<Wallet> {
    return await this.walletsService.toggleFavoriteWallet(id);
  }
}
