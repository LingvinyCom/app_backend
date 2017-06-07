import {
  JsonController,
  Body,
  Get,
  HttpCode,
  HeaderParam,
  Authorized
} from 'routing-controllers';

import { BaseController } from './BaseController';

@JsonController('/card')
export class CardController extends BaseController {

  @Get('/payment')
  @Authorized()
  list( @HeaderParam('authorization') _lingviny_token: string) {
    return this.request.get('/client/cards/payments',
      { params: { _lingviny_token } }
    );
  }
}
