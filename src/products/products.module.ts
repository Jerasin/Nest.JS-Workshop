import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controller/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import {ProductsEntity} from './models/products.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity])
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
