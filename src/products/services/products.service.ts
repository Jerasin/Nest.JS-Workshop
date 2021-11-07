import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm'

import { ProductsEntity } from '../models/products.entity'
import { ProductInsert } from '../models/products.interfaces'

import {removeFile} from '../../middlewares/uploadfile/config.upload';
import { join } from 'path';
@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(ProductsEntity)
        private ProductRepository: Repository<ProductsEntity>
    ) { }

    async createProduct(product: ProductInsert): Promise<ProductsEntity> {
        console.log(product);
        return await this.ProductRepository.save(product)
    }

    async getProduct(page: number , limit: number ): Promise<object> {
        const currentPage = (page - 1) * limit;
console.log(currentPage,limit);
        const result = await this.ProductRepository.createQueryBuilder('p')
            .select(['p', 'createdBy.email'])
            .leftJoin('p.createdBy', 'createdBy')
            .offset(currentPage)    
            .limit(limit)       
            .execute()
        
        const countResult = await this.ProductRepository.count();
        const countPage = Math.ceil(countResult/limit)
            return {result: result, totalPage: countPage}
        //? This will generate the following sql query
        //! select p.id , p.p_code , p.p_name , p.p_price , p.p_stock , p.p_image , p.createdAt , p.updatedAt , u.email from products as p left join user_info as u ON p.createdBy = u.id limit(currentPage, limit)
    }

    async deleteProduct(id: number): Promise<object> {
        const checkImage = await this.ProductRepository.findOne(id);
        if(checkImage){
            if(checkImage.image){
                removeFile(join(process.cwd(),'images/upload/'+checkImage.image))
            }
            return this.ProductRepository.delete(id);
        }
    }
}
