import { Body, Controller, HttpStatus, HttpException, Post, UploadedFile, UseGuards, UseInterceptors, Get, Param, Res , Query, Delete} from '@nestjs/common';

import { ProductsService } from '../services/products.service'

import { ProductsEntity } from '../models/products.entity'

import { ProductsFormData , ProductInsert } from '../models/products.interfaces'

import { JwtAuthGuard_Admin, JwtAuthGuard_User } from '../../users/auth/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express';

import {saveImageToStorage} from '../../middlewares/uploadfile/config.upload'


import formidable from 'formidable';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @UseGuards(JwtAuthGuard_User)
    @Get()
    //? Setup use Formdata
    @FormDataRequest()
    async getProduct(@Body('page') page:any = 1 , @Body('limit') limit: any = 5): Promise<object>{

        let pageInt:number
        let limitInt:number

        if(typeof page === 'string' || typeof limit === 'string'){
            pageInt = parseInt(page);
            limitInt = parseInt(limit);
            return await this.productsService.getProduct(pageInt,limitInt);
        }
        else if(typeof page === 'number' || typeof limit === 'number'){
            return await this.productsService.getProduct(page,limit);
        }
        else{
            throw new HttpException('Not Found',HttpStatus.NOT_FOUND)
        }
    }

    // @Get(":fileName")
    // getImageById(@Param() param , @Res() res): Promise<object>{
    //     console.log(param.fileName);
    //     const pathImage = join(process.cwd(),'images/upload/'+param.fileName)
    //     console.log(pathImage)
    //     return res.sendFile(join(process.cwd(),'images/upload/'+param.fileName))
    // }

    @UseGuards(JwtAuthGuard_Admin)
    @Post()
    @UseInterceptors(FileInterceptor('file', 
        saveImageToStorage
    ))
    async createProduct(@UploadedFile() file, @Body() product: ProductsFormData): Promise<string> {
        if(file && product){           
            const data:ProductInsert ={
                p_code: parseInt(product.p_code),
                p_name: product.p_name,
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
        else if(!file && product){
            const data:ProductInsert ={
                p_code: parseInt(product.p_code),
                p_name: product.p_name,
                p_price: parseFloat(product.p_price),
                p_stock: parseInt(product.p_stock),
                createdBy: parseInt(product.createdBy),
            }
            const productInsert = await this.productsService.createProduct(data).catch((error)=>{
                throw new HttpException(error.detail,HttpStatus.BAD_REQUEST)
            });
            if(productInsert){
                return 'Insert Product Success';
            }
        }
        else{
            throw new HttpException('Not Found',HttpStatus.NOT_FOUND)
        }
      
    }

    @Delete(':id')
    async deleteProductById(@Param() id:number): Promise<object> {
        const result = await this.productsService.deleteProduct(id);
        if(result){
            return {status:200,result:'Delete Success'}
        }
        else{
            throw new HttpException('Not Found',HttpStatus.NOT_FOUND)
        }
    }
}
