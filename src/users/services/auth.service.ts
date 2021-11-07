import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//! Import Model Database
//? Import Mapping Model Object Type with Interface 
import { UsersEntity } from '../models/users.entity'
import { User } from '../models/users.interface'

//? Import Rxjs
import { from, Observable } from 'rxjs';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersEntity)
        private UsersRepository: Repository<UsersEntity>
    ) { }

    //? ใช่ Rxjs
    // createUser(user: User): Observable<User>{
    //     return from(this.UsersRepository.save(user))
    // }

    //? ใช้ Promise และใชเแค่ Entity อย่างเดียวก็ได้ไม่จำเป็นต้องสร้าง interface
    async createUser(user: UsersEntity): Promise<UsersEntity> {
        const getUser = await this.UsersRepository.findOne({ where: { email: user.email } })
        if (getUser) {
            throw new HttpException("Duplicate Email", HttpStatus.BAD_REQUEST)
        }
        else {
            try {
                return await this.UsersRepository.save(user);
            }
            catch (err) {
                throw new HttpException(err, HttpStatus.BAD_REQUEST)
            }
        }

    }

    async loginUser(user: { email: string, password: string }): Promise<UsersEntity> {
        return await this.UsersRepository.findOne({ where: { email: user.email } }).catch((err) => {
            throw new HttpException(err.massage, HttpStatus.BAD_REQUEST)
        })
    }

    //? แบบใช้ Rxjs
    getAll(): Observable<UsersEntity[]> {
        return from(this.UsersRepository.find().catch((err) => {
            throw new HttpException(err.massage, HttpStatus.BAD_REQUEST)
        }))
    }

    async findById(id: number): Promise<UsersEntity> {
        return await this.UsersRepository.findOne(id).catch((err) => {
            throw new HttpException(err.massage, HttpStatus.BAD_REQUEST)
        })

    }
}
