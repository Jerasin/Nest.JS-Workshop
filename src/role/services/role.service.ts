import { HttpStatus, Injectable , HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../models/role.entity';

//? Import Rxjs
import { from, Observable } from 'rxjs';

@Injectable()
export class RoleService {
        constructor(
            @InjectRepository(RoleEntity)
            private RoleRepository: Repository<RoleEntity>) { }

    //? ใช่ Rxjs
    createRole(role: RoleEntity): Observable<RoleEntity> {
        return from(this.RoleRepository.save(role).catch((err)=>{
            throw new HttpException(err.message,HttpStatus.BAD_REQUEST)
        }))
    }
}
