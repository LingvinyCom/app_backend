import { JsonController, Body, Post, HttpCode, HeaderParam, Authorized } from 'routing-controllers';

import { BaseController } from './BaseController';
import { Exists, Login } from './../models';

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
