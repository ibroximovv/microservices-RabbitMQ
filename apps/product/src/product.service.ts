import { CreateProductDto, UpdateProductDto } from '@app/l';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService){}
  async createProduct(data: CreateProductDto) {
    try {
      const findone = await this.prisma.product.findFirst({ where: { name: data.name }})
      if (findone) throw new BadRequestException('product already exists')
      return await this.prisma.product.create({ data })
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async getAllProduct() {
    try {
      return await this.prisma.product.findMany()
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async getOneProduct(id: number) {
    try {
      const findone = await this.prisma.product.findFirst({ where: { id }})
      if (!findone) throw new BadRequestException('Product not found')
      return findone;
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    try {
      const findone = await this.prisma.product.findFirst({ where: { id }})
      if (!findone) throw new BadRequestException('Product not found')
      return await this.prisma.product.update({ where: { id }, data })
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async deleteProduct(id: number) {
    try {
      const findone = await this.prisma.product.findFirst({ where: { id }})
      if (!findone) throw new BadRequestException('Product not found')
      return await this.prisma.product.delete({ where: { id }})
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }
}
