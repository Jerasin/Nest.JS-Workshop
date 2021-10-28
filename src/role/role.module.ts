import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controller/role.controller';
import {RoleEntity} from './models/role.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
