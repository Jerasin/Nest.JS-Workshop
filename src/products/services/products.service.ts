import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {Repository} from 'typeorm'

import {ProductsEntity} from '../models/products.entity'
import { ProductInsert } from '../models/products.interfaces'
@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(ProductsEntity)
        private ProductRepository: Repository<ProductsEntity>
    ){}

   async createProduct(product: ProductInsert): Promise<ProductsEntity>{     
            return await this.ProductRepository.save(product)
    }
}
