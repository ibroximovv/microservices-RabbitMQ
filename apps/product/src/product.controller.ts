import { Controller} from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto, UpdateProductDto } from '@app/l';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @MessagePattern('create-product')
  createProduct(@Payload() payload: { data: CreateProductDto }) {
    return this.productService.createProduct(payload.data)
  }

  @MessagePattern('getAll-product')
  getAllProduct() {
    return this.productService.getAllProduct()
  }

  @MessagePattern('getOne-product')
  getOneProduct(@Payload() payload: { id: number }) {
    return this.productService.getOneProduct(payload.id)
  }

  @MessagePattern('update-product')
  updateProduct(@Payload() payload: { id: number, data: UpdateProductDto }) {
    return this.productService.updateProduct(payload.id, payload.data)
  }

  @MessagePattern('delete-product')
  deleteProduct(@Payload() payload: { id: number }) {
    return this.productService.deleteProduct(payload.id)
  }
}
