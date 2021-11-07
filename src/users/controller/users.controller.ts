import { Body, Controller, Post , HttpException , HttpStatus , UseGuards, Get, Param  } from '@nestjs/common';
import { UsersService } from '../services/users.service'

//? Import Model
import { userLogin , User } from '../models/users.interface'
import {UsersEntity} from '../models/users.entity'

//? Import Rxjs
import {from, Observable} from 'rxjs';

//? Import Jwt
import { JwtService } from '@nestjs/jwt';
import {JwtAuthGuard_Admin , JwtAuthGuard_User} from '../auth/jwt-auth.guard';

import { FormDataRequest } from 'nestjs-form-data';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
        ) { }


    // @Post()
    // create(@Body() user: User): Observable<User> {
    //     return this.userService.createUser(user)
    // }

    @UseGuards(JwtAuthGuard_Admin)
    // @UseGuards(JwtAuthGuard_User)
    @Get()
    //? Setup use Formdata
    @FormDataRequest()
    async getAllusers(@Body('page') page:any = 1 , @Body('limit') limit: any = 5): Promise<object> {

        let pageInt:number
        let limitInt:number
        
        if(typeof page === 'string' || typeof limit === 'string'){
            pageInt = parseInt(page);
            limitInt = parseInt(limit);
            return await  this.userService.getUserList(page,limit)
        }
        else if(typeof page === 'number' || typeof limit === 'number'){
            return  await this.userService.getUserList(page,limit)
        }
        else{
            throw new HttpException('Not Found',HttpStatus.NOT_FOUND)
        }
    }

    // @UseGuards(JwtAuthGuard_Admin)
    @Get(':id')
    async getById(@Param('id') id:string ): Promise<UsersEntity> {
       return await this.userService.findById(Number(id))
    }

}
