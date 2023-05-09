import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Wallet } from '../entities/wallet.entity';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

describe('WalletsService', () => {
  let service: WalletsService;
  let repository: Repository<Wallet>;

  const mockWallet = {
    id: '1',
    name: 'test',
    address: 'test address',
    isFavorite: false,
  };

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockWallet]),
    create: jest.fn().mockReturnValue(mockWallet),
    save: jest.fn().mockResolvedValue(mockWallet),
    findOne: jest.fn().mockResolvedValue(mockWallet),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        {
          provide: getRepositoryToken(Wallet),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
    repository = module.get<Repository<Wallet>>(getRepositoryToken(Wallet));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllWallets', () => {
    it('should return an array of wallets', async () => {
      const result = await service.getAllWallets();
      expect(result).toEqual([mockWallet]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('addWallet', () => {
    it('should create and return a new wallet', async () => {
      const walletData: CreateWalletDto = {
        address: 'test address',
      };
      const result = await service.addWallet(walletData);
      expect(result).toEqual(mockWallet);
      expect(repository.create).toHaveBeenCalledWith(walletData);
      expect(repository.save).toHaveBeenCalledWith(mockWallet);
    });
  });

});
