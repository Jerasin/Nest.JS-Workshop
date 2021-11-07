import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import {AuthService} from './services/auth.service'

import { UsersController  } from './controller/users.controller';
import {AuthController} from './controller/auth.controller'

import { TypeOrmModule } from '@nestjs/typeorm';

import {UsersEntity} from './models/users.entity'

import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from './auth/jwt.strategy'
//?  .env
import * as dotenv from "dotenv";
dotenv.config();

//? Setup use Formdata
import { NestjsFormDataModule } from 'nestjs-form-data';
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    //? Config Jwt-Token
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1H' },
    }),
     //? Setup use Formdata
     NestjsFormDataModule,
  ],
  providers: [UsersService , JwtStrategy , AuthService],
  controllers: [UsersController,AuthController]
})
export class UsersModule {}
