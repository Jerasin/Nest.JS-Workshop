import { Column, Entity, PrimaryGeneratedColumn, ManyToOne , JoinColumn , OneToMany } from "typeorm";

//? ใช้สำหรับทำ validator และ return Error กลับไปให้ Client
import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, IsDate } from 'class-validator';

import {RoleEntity} from '../../role/models/role.entity'
import {ProductsEntity} from '../../products/models/products.entity'
//? Entity is Name Column
@Entity('user_info')
export class UsersEntity{
    @PrimaryGeneratedColumn({type: 'int' })
    id: number;

    @Column({type: 'varchar' , length: 255 ,unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({type: 'varchar' , length: 255 })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Column({name: 'role_id'})
    @IsNumber()
    role: number;
   
    // @IsNotEmpty()
    @ManyToOne(()=>RoleEntity, (roleEntity) =>{
        roleEntity.id
    },{onDelete: "CASCADE" , onUpdate: "CASCADE"} 
    )
    @JoinColumn({ name: 'role_id' })
    role_name: RoleEntity;

    @Column({type: 'date' , default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'date' , nullable: true })
    updatedAt?: Date;

    @OneToMany(() => ProductsEntity, productsEntity => productsEntity.id)
    user: ProductsEntity;
}