import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async getAllWallets(): Promise<Wallet[]> {
    return await this.walletRepository.find();
  }

  async addWallet(walletData: CreateWalletDto): Promise<Wallet> {
    const existingWallet = await this.walletRepository.findOne({
      where: { address: walletData.address },
    });

    if (existingWallet) {
      throw new BadRequestException('Wallet already exists in the table');
    }
    
    const newWallet = this.walletRepository.create(walletData);
    await this.walletRepository.save(newWallet);
    return newWallet;
  }

  async toggleFavoriteWallet(id: string): Promise<Wallet> {
    const options: FindOneOptions<Wallet> = { where: { id } };
    const wallet = await this.walletRepository.findOne(options);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    wallet.isFavorite = !wallet.isFavorite;
    await this.walletRepository.save(wallet);
    return wallet;
  }
}
