import { Column, Entity, PrimaryGeneratedColumn, ManyToOne , JoinColumn } from "typeorm";

//? ใช้สำหรับทำ validator และ return Error กลับไปให้ Client
import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, IsDate } from 'class-validator';

import {UsersEntity} from '../../users/models/users.entity'

//? Entity is Name Column
@Entity('master_product')
export class ProductsEntity{
    @PrimaryGeneratedColumn({type: 'int' })
    id: number;

    @Column({type: 'int'  ,unique: true })
    @IsNumber()
    @IsNotEmpty()
    p_code: number;

    @Column({type: 'varchar' , length: 255 ,unique: true })
    @IsString()
    @IsNotEmpty()
    p_name: string;

    @Column({type: 'float'  })
    @IsNumber()
    @IsNotEmpty()
    p_price: number;

    @Column({type: 'int' })
    @IsNumber()
    @IsNotEmpty()
    p_stock: number;

    @Column({type: 'varchar', length: 255 ,unique: true  , nullable: true})
    image: string;

    @Column({type: 'date' , default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'date' , nullable: true })
    updatedAt?: Date;

    // @Column({name: 'createdBy'})
    // @IsNumber()
    // createdBy: number;

    @ManyToOne(()=>UsersEntity, (userEntity) =>{
        userEntity.id
    },{onDelete: "CASCADE" , onUpdate: "CASCADE"} 
    )
    @JoinColumn({ name: 'createdBy' })
    createdBy: UsersEntity;
}