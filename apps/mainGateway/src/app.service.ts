import { CreateProductDto, UpdateProductDto } from '@app/l';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('PRODS') private readonly product: ClientProxy){}
  createProduct(data: CreateProductDto) {
    return this.product.send('create-product', { data })
  }

  getAllProduct() {
    return this.product.send('getAll-product', {})
  }

  getOneProduct(id: number) {
    return this.product.send('getOne-product', { id })
  }

  updateProduct(id: number, data: UpdateProductDto) {
    return this.product.send('update-product', { id, data })
  }

  deleteproduct(id: number) {
    return this.product.send('delete-product', { id })
  }
}
