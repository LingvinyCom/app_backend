import { JsonController, Get } from 'routing-controllers';

import { BaseController } from './BaseController';
import { Engine } from '../models/Engine';

@JsonController('/engine')
export class EngineController extends BaseController {

  @Get('/list')
  async emailEngines() {
    return await this.connection.getRepository(Engine).find({ is_custom: false });
  }
}
