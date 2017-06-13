import { JsonController, Get } from 'routing-controllers';

import { BaseController } from './BaseController';

@JsonController('/engine')
export class EngineController extends BaseController {

  @Get('/')
  async emailEngines() {
    return await this.engineRepository.find({ is_custom: false });
  }
}
