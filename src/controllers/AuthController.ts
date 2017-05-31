import { Controller, Param, Body, Post } from 'routing-controllers';

@Controller('/auth')
export class AuthController {
  
  @Post('/exists')
  login() {}
}