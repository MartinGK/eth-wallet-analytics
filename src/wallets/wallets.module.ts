import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { Wallet } from '../entities/wallet.entity';
import { WalletRepository } from './wallets.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, WalletRepository])], 
  providers: [WalletsService],
  controllers: [WalletsController],
})
export class WalletsModule {}
