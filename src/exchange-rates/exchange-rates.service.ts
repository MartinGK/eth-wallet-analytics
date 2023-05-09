import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { ExchangeRates } from '../entities/exchange-rates.entity';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExchangeRatesService {
  constructor(
    @InjectRepository(ExchangeRates)
    private readonly exchangeRatesRepository: Repository<ExchangeRates>,
  ) {}

  async onModuleInit() {
    await this.addDefaultExchangeRates();
  }

  async addExchangeRate(
    createExchangeRateDto: CreateExchangeRateDto,
  ): Promise<ExchangeRates> {
    const exchangeRate = new ExchangeRates();
    exchangeRate.currency = createExchangeRateDto.currency;
    exchangeRate.rate = createExchangeRateDto.rate;
    const newExchangeRate = this.exchangeRatesRepository.create(exchangeRate);
    await this.exchangeRatesRepository.save(newExchangeRate);
    return exchangeRate;
  }

  async updateExchangeRate(
    id: string,
    updateExchangeRateDto: UpdateExchangeRateDto,
  ): Promise<ExchangeRates> {
    const exchangeRate = await this.exchangeRatesRepository.findOne({
      where: { id },
    });

    if (!exchangeRate) {
      throw new NotFoundException('Exchange rate not found');
    }

    const updatedExchangeRate = Object.assign(
      exchangeRate,
      updateExchangeRateDto,
    );
    await this.exchangeRatesRepository.save(updatedExchangeRate);

    return updatedExchangeRate;
  }

  async getAllExchangeRates(): Promise<ExchangeRates[]> {
    return await this.exchangeRatesRepository.find();
  }

  async addDefaultExchangeRates() {
    const defaultExchangeRates: CreateExchangeRateDto[] = [
      { currency: 'EUR', rate: 0.00044 },
      { currency: 'USD', rate: 0.00056 },
    ];

    for (const defaultExchangeRate of defaultExchangeRates) {
      const existingExchangeRate = await this.exchangeRatesRepository.findOne({
        where: {
          currency: defaultExchangeRate.currency,
        },
      });

      if (!existingExchangeRate) {
        await this.addExchangeRate(defaultExchangeRate);
      }
    }
  }
}
