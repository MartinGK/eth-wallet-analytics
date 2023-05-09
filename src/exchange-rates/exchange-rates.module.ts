import { Module } from '@nestjs/common';
import { ExchangeRatesController } from './exchange-rates.controller';
import { ExchangeRatesService } from './exchange-rates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRates } from '../entities/exchange-rates.entity';
import { ExchangeRatesRepository } from './exchange-rates.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeRates, ExchangeRatesRepository])], 
  providers: [ExchangeRatesService],
  controllers: [ExchangeRatesController],
})
export class ExchangeRatesModule {}
