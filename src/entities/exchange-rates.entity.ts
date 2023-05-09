import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ExchangeRates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  currency: string;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  rate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
