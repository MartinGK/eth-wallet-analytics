import { Controller, Get, Param } from '@nestjs/common';
import { EtherscanService } from '../etherscan/etherscan.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('eth')
@Controller('eth')
export class EthController {
  constructor(private readonly etherscanService: EtherscanService) {}

  @Get('balance/:address')
  @ApiParam({ name: 'address', description: 'Ethereum address' })
  @ApiResponse({
    status: 200,
    description: 'Get balance for the Ethereum address',
    type: String,
  })
  async getBalance(@Param('address') address: string): Promise<string> {
    return await this.etherscanService.getBalance(address);
  }

  @Get(':address/is-old')
  @ApiParam({ name: 'is-old', description: 'Check if a wallet is old' })
  @ApiResponse({
    status: 200,
    description: 'Check if a wallet is old',
    type: String,
  })
  async isWalletOld(
    @Param('address') address: string,
  ): Promise<{ isOld: boolean }> {
    const isOld = await this.etherscanService.isWalletOld(address);
    return { isOld };
  }
}
