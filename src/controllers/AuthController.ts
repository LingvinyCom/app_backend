import { JsonController, Body, Post, HttpCode, HeaderParam, Authorized } from 'routing-controllers';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { BaseController } from './BaseController';

export class Exists {

  @IsEmail()
  public email: string;
}

export class Login {

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}

@JsonController('/auth')
export class AuthController extends BaseController {

  @Post('/exists')
  exists( @Body() credentials: Exists) {
    return this.request.get('/auth/exists', {
      params: credentials
    });
  }

  @Post('/login')
  login( @Body() credentials: Login) {
    return this.request.get('/auth/login', {
      params: credentials
    });
  }

  @Authorized()
  @HttpCode(204)
  @Post('/logout')
  logout( @HeaderParam('authorization') _lingviny_token: string) {
    return this.request.get('/auth/logout', { params: { _lingviny_token } });
  }

  @Post('/password_reset')
  @HttpCode(204)
  reset( @Body() credentials: Exists) {
    return this.request.get('/auth/password_reset', {
      params: credentials
    });
  }
}
