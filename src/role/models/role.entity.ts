import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

//? ใช้สำหรับทำ validator และ return Error กลับไปให้ Client
import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, IsDate } from 'class-validator';

import {UsersEntity} from '../../users/models/users.entity'

//? Entity is Name Column
@Entity('master_role')
export class RoleEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column({type: 'date' , default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'date' , nullable: true })
    updatedAt?: Date;

    @OneToMany(() => UsersEntity, usersEntity => usersEntity.id)
    user: UsersEntity;
}