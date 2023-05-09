import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletRepository extends Repository<Wallet> {
  constructor(
    @InjectRepository(Wallet)
    repository: Repository<Wallet>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
