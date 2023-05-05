import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtherscanService } from './etherscan/etherscan.service';
import { EthController } from './eth/eth.controller';

@Module({
  imports: [],
  controllers: [AppController, EthController],
  providers: [AppService, EtherscanService],
})
export class AppModule {}
