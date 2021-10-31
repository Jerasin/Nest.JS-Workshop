import { Body, Controller, HttpStatus, HttpException, Post, UploadedFile, UseGuards, UseInterceptors, Get, Param, Res } from '@nestjs/common';

import { ProductsService } from '../services/products.service'

import { ProductsEntity } from '../models/products.entity'

import { ProductsFormData , ProductInsert } from '../models/products.interfaces'

import { JwtAuthGuard_Admin, JwtAuthGuard_User } from '../../users/auth/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express';

import {saveImageToStorage} from '../../middlewares/uploadfile/config.upload'
import { join } from 'path';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    // @UseGuards(JwtAuthGuard_Admin)
    // @Post()
    // async create(@Body() product: ProductsEntity): Promise<ProductsEntity> {
    //     return this.productsService.createProduct(product);
    // }

    @Get(":fileName")
    getImageById(@Param() param , @Res() res): Promise<object>{
        console.log(param.fileName);
        const pathImage = join(process.cwd(),'images/upload/'+param.fileName)
        console.log(pathImage)
        return res.sendFile(join(process.cwd(),'images/upload/'+param.fileName))
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', 
        saveImageToStorage
    ))
    async uploadFile(@UploadedFile() file, @Body() product: ProductsFormData): Promise<string> {
        
        if(file && product){
            
            // const test = parseInt(product.p_price)
            const data:ProductInsert ={
                p_code: parseInt(product.p_code),
                name: product.name,
                p_price: parseFloat(product.p_price),
                p_stock: parseInt(product.p_stock),
                image: file.filename,
                createdBy: parseInt(product.createdBy),
            }
            const productInsert = await this.productsService.createProduct(data).catch((error)=>{
                throw new HttpException(error.detail,HttpStatus.BAD_REQUEST)
            });
            if(productInsert){
                return 'Insert Product Success';
            }
        }
      
    }
}


// const randomString = () => {
//     return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
// }