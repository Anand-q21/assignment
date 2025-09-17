import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  /**
   * Create a new product
   */
  async create(dto: CreateProductDto): Promise<Product> {
    // Ensure productCode is unique
    const existing = await this.repo.findOne({
      where: { productCode: dto.productCode },
    });
    if (existing) {
      throw new ConflictException(
        `Product code "${dto.productCode}" already exists`,
      );
    }

    const product = this.repo.create(dto);
    return this.repo.save(product);
  }

  /**
   * Get all products
   */
  async findAll(): Promise<Product[]> {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get one product by ID
   */
  async findOne(id: number): Promise<Product> {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  /**
   * Update an existing product
   */
  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    // If productCode is being changed, check uniqueness
    if (dto.productCode && dto.productCode !== product.productCode) {
      const existing = await this.repo.findOne({
        where: { productCode: dto.productCode },
      });
      if (existing) {
        throw new ConflictException(
          `Product code "${dto.productCode}" already exists`,
        );
      }
    }

    Object.assign(product, dto);
    return this.repo.save(product);
  }

  /**
   * Delete a product
   */
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.repo.remove(product);
  }
}