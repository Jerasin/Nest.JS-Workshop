import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard_Admin extends AuthGuard('jwt') {

  handleRequest(err, user, info) {
    if (user.roleId === 1) {
      return user;

    }
    throw err || new UnauthorizedException();
  }
}

@Injectable()
export class JwtAuthGuard_User extends AuthGuard('jwt') {

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
