import { Body, Controller, Post, HttpException, HttpStatus, UseGuards, Get, Param } from '@nestjs/common';

//? Import Service
import { UsersService } from '../services/users.service'

//? Import Model
import { userLogin } from '../models/users.interface'
import { UsersEntity } from '../models/users.entity'

//? Import Rxjs
import { from, Observable } from 'rxjs';

//? Import Bcrypt
import * as bcrypt from 'bcrypt'

//? Import Jwt
import { JwtService } from '@nestjs/jwt';

@Controller('authen')
export class AuthController {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    @Post('register')
    async create(@Body() user: UsersEntity): Promise<String> {
        user.password = await bcrypt.hash(user.password, 10)
        const createUser = await this.userService.createUser(user)
        if (createUser) {
            return 'Register Success'
        } else {
            throw new HttpException('Error', HttpStatus.BAD_REQUEST)
        }

    }

    @Post('login')
    async login(@Body() user: userLogin): Promise<Object> {
        const getUser = await this.userService.loginUser(user)
        if (getUser) {
            const isMatch = await bcrypt.compare(user.password, getUser.password)
            if (isMatch) {
                const payload = { id: getUser.id, role: getUser.role }
                // console.log(getUser);
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
            else {
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
            }
        }
        else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
    }
}
