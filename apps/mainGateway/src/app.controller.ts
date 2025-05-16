import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProductDto, UpdateProductDto } from '@app/l';
import { AuthGuard } from 'apps/auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(AuthGuard)
  @Post('product')
  createProduct(@Body() data: CreateProductDto) {
    return this.appService.createProduct(data)
  }

  @Get('getAll-product')
  getAllproduct() {
    return this.appService.getAllProduct()
  }

  @Get('getOne-product')
  getOneproduct(@Param('id') id: string) {
    return this.appService.getOneProduct(+id)
  }

  @UseGuards(AuthGuard)
  @Patch('product')
  updateProduct(@Param('id') id: string, data: UpdateProductDto) {
    return this.appService.updateProduct(+id, data)
  }

  @UseGuards(AuthGuard)
  @Delete('product')
  deleteProduct(@Param('id') id: string) {
    return this.appService.deleteproduct(+id)
  }
}
