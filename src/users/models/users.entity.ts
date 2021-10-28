import { Column, Entity, PrimaryGeneratedColumn, ManyToOne , JoinColumn } from "typeorm";

//? ใช้สำหรับทำ validator และ return Error กลับไปให้ Client
import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, IsDate } from 'class-validator';

import {RoleEntity} from '../../role/models/role.entity'

//? Entity is Name Column
@Entity('user_info')
export class UsersEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
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
}