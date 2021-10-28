import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersEntity} from './models/users.entity'

import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from './auth/jwt.strategy'
//?  .env
import * as dotenv from "dotenv";
dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    //? Config Jwt-Token
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UsersService , JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {}
