import { JsonController, Post } from 'routing-controllers';

import { BaseController } from './BaseController';
import { Engine } from '../models/Engine';

@JsonController('/engine')
export class EngineController extends BaseController {

  @Post('/list')
  async emailEngines() {
    return await this.connection.getRepository(Engine).find({ is_custom: false });
  }
}
