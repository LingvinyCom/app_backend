import { JsonController, Body, Post } from 'routing-controllers';
import { stringify } from 'query-string';

import { BaseController } from './BaseController';
import { Client } from './../models';

@JsonController('/client')
export class ClientController extends BaseController {

  @Post('/create')
  create( @Body({ required: true }) client: Client) {
    return this.request.post(`/client/create?${stringify(client)}`);
  }
}
