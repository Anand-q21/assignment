import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  productCode!: string;

  @Column()
  productName!: string;

  @Column('text')
  productDescription!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  productRate!: number;

  @Column({ nullable: true })
  productImage?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}