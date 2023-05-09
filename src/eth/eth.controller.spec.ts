import { Test, TestingModule } from '@nestjs/testing';
import { EthController } from './eth.controller';
import { EtherscanService } from '../etherscan/etherscan.service';

describe('EthController', () => {
  let controller: EthController;
  let etherscanService: EtherscanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EthController],
      providers: [
        {
          provide: EtherscanService,
          useValue: {
            getBalance: jest.fn().mockImplementation((address) => Promise.resolve('1000')),
          },
        },
      ],
    }).compile();

    controller = module.get<EthController>(EthController);
    etherscanService = module.get<EtherscanService>(EtherscanService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBalance', () => {
    it('should return the balance for a given Ethereum address', async () => {
      const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      const expectedResult = '1000';

      const result = await controller.getBalance(address);
      expect(result).toBe(expectedResult);
      expect(etherscanService.getBalance).toHaveBeenCalledWith(address);
      expect(etherscanService.getBalance).toHaveBeenCalledTimes(1);
    });
  });
});
