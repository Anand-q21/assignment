import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('jsonb')
  customerDetails!: {
    name: string;
    phone: string;
  };

  @Column('jsonb')
  products!: Array<{
    productId: number;
    quantity: number;
    unitPrice: number;
  }>;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}