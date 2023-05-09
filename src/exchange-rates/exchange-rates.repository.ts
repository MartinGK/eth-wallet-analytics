import {  Repository } from 'typeorm';
import { ExchangeRates } from '../entities/exchange-rates.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeRatesRepository extends Repository<ExchangeRates> {
  constructor(
    @InjectRepository(ExchangeRates)
      repository: Repository<ExchangeRates>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}