import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controller/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import {ProductsEntity} from './models/products.entity'

//? Setup use Formdata
import { NestjsFormDataModule } from 'nestjs-form-data';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity]),
    //? Setup use Formdata
    NestjsFormDataModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
