import { Body, Controller, Post } from '@nestjs/common';
import { RoleEntity } from '../models/role.entity';
import {RoleService} from '../services/role.service'

//? Import Rxjs
import {from, Observable} from 'rxjs';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) { }

    @Post()
    create(@Body() role: RoleEntity):Observable<RoleEntity>{
        return  from(this.roleService.createRole(role))
    }
}
