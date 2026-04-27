import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Logger } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);
  constructor(private readonly productsService: ProductsService) { }

  // @Post()
  @MessagePattern({ cmd: 'createProduct' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'findAllProducts' })
  findAll(@Payload() paginationDto: PaginationDto) {
    this.logger.log(`Received pagination parameters: ${JSON.stringify(paginationDto)}`);
    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'findOneProduct' })
  async findOne(@Payload('id', ParseUUIDPipe) id: string) {
    this.logger.log(`Finding product with id: ${id}`);
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error finding product: ${err.message}`, err.stack);
      throw error;
    }
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'updateProduct' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'removeProduct' })
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
