import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

describe('WalletsController', () => {
  let controller: WalletsController;
  let walletsService: WalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [
        {
          provide: WalletsService,
          useValue: {
            getAllWallets: jest.fn().mockResolvedValue([
              { id: '1', favorite: false, address: '0x1' },
              { id: '2', favorite: true, address: '0x2' },
            ]),
            addWallet: jest.fn().mockImplementation((walletData: CreateWalletDto) =>
              Promise.resolve({ id: '3', favorite: false, ...walletData }),
            ),
            toggleFavoriteWallet: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({ id, favorite: true, address: '0x1' }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
    walletsService = module.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllWallets', () => {
    it('should return an array of wallets', async () => {
      const result = await controller.getAllWallets();
      expect(result).toEqual([
        { id: '1', favorite: false, address: '0x1' },
        { id: '2', favorite: true, address: '0x2' },
      ]);
      expect(walletsService.getAllWallets).toHaveBeenCalled();
    });
  });

  describe('addWallet', () => {
    it('should add a wallet and return the created wallet', async () => {
      const createWalletDto: CreateWalletDto = { address: '0x3' };
      const result = await controller.addWallet(createWalletDto);
      expect(result).toEqual({ id: '3', favorite: false, ...createWalletDto });
      expect(walletsService.addWallet).toHaveBeenCalledWith(createWalletDto);
    });
  });

  describe('toggleFavoriteWallet', () => {
    it('should toggle the favorite status of a wallet and return the updated wallet', async () => {
      const id = '1';
      const result = await controller.toggleFavoriteWallet(id);
      expect(result).toEqual({ id, favorite: true, address: '0x1' });
      expect(walletsService.toggleFavoriteWallet).toHaveBeenCalledWith(id);
    });
  });
});
