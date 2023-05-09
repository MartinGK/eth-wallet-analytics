import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtherscanService } from './etherscan/etherscan.service';
import { EthController } from './eth/eth.controller';
import { WalletsModule } from './wallets/wallets.module';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    WalletsModule,
    ExchangeRatesModule,
  ],
  controllers: [AppController, EthController],
  providers: [AppService, EtherscanService],
})
export class AppModule {}
