import {
  JsonController,
  Body,
  Get,
  HttpCode,
  HeaderParam,
  Authorized
} from 'routing-controllers';

import { BaseController } from './BaseController';

@JsonController('/order')
export class OrderController extends BaseController {

  @Get('/')
  @Authorized()
  list( @HeaderParam('authorization') _lingviny_token: string) {
    return this.request.get('/app_orders/list', { params: { _lingviny_token } });
  }
}
