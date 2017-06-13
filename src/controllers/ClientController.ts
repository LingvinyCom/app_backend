import {
  JsonController,
  Body,
  Post,
  Put,
  Authorized,
  HttpCode,
  Param,
  HeaderParam
} from 'routing-controllers';
import { stringify } from 'query-string';
import * as Boom from 'boom';

import { BaseController } from './BaseController';
import { Client, ClientUpdate, EmailAccount as EmailAccValidator, Engine as EngineValidator } from './../validation';
import { User, EmailAccount, Engine } from '../models';

@JsonController('/client')
export class ClientController extends BaseController {

  @Post('/')
  async create( @Body({ required: true }) client: Client) {
    const { email, password, engine_id, new_engine } = client;

    let token;
    try {
      token = await this.request.post(`/client/create?${stringify({ email, password })}`)
        .then((res: any) => res.lingviny_token);
    } catch (e) {
      throw Boom.badImplementation('Server error');
    }

    const engine = await this.getEngine(engine_id, new_engine);
    if (!engine) throw Boom.badData('Wrong engine data is sending!');

    let user = new User();
    user.token = token;
    user = await this.userRepository.persist(user);

    const newMailAccount = Object.assign(new EmailAccount(), { email, password, is_master: true, user, engine });
    await this.emailAccountRepository.persist(newMailAccount);

    return user;
  }

  @Put('/')
  @HttpCode(204)
  @Authorized()
  update( @HeaderParam('authorization') _lingviny_token: string,
    @Body({ required: true }) client: ClientUpdate) {
    const params = stringify({ ...client, _lingviny_token });
    return this.request.post(`/client/edit?${params}`);
  }

  @Authorized()
  @Post('/:id/add-email')
  async addEmail( @Body() credentials: EmailAccValidator,
                  @Param('id') id: number) {
    const { email, password, engine_id, new_engine } = credentials;

    const user = await this.userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('user', 'email_account.user')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) throw Boom.notFound();

    const engine = await this.getEngine(engine_id, new_engine);
    if (!engine) throw Boom.notFound();

    const newAcc = Object.assign(new EmailAccount(), { email, password, is_master: false, engine, user });
    return this.emailAccountRepository.persist(newAcc);
  }

  async getEngine(engine_id: number, new_engine: EngineValidator) {
<<<<<<< HEAD
    const engineRepos = this.connection.getRepository(Engine);
    
=======
>>>>>>> develop
    if (new_engine) {
      const newEngine = Object.assign(new Engine(), new_engine);
      return this.engineRepository.persist(newEngine)
    }
    return this.engineRepository.findOneById(engine_id);
  }
}
