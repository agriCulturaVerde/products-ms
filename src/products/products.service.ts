import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {

  constructor(private prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    return await this.prismaService.product.create({ data: createProductDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const totalItems = await this.prismaService.product.count();
    const totalPages = Math.ceil(totalItems / limit);
    return {
      data: await this.prismaService.product.findMany({
        skip,
        take: limit,
      }),
      metadata: {
        page,
        totalPages,
      }
    };
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({ where: { id } });
    if (!product) {
      throw new RpcException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    const existingProduct = await this.findOne(updateProductDto.id);

    return this.prismaService.product.update({
      where: { id: updateProductDto.id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prismaService.product.delete({ where: { id } });
  }

  async validateProducts(ids: string[]): Promise<{ id: string[] }> {
    const products = await this.prismaService.product.findMany({
      where: { id: { in: ids } },
    });

    return { id: products.map(product => product.id) };
  }
}
