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
import { Client, ClientUpdate, EmailAccount as EmailAccValidator } from './../validation';
import { User } from '../models/User';
import { EmailAccount } from '../models/EmailAccount';
import { Engine } from '../models/Engine';
import { Engine as EngineValidator } from '../validation/Engine';

@JsonController('/client')
export class ClientController extends BaseController {

  @Post('/')
  async create( @Body({ required: true }) client: Client) {
    const userRepos = this.connection.getRepository(User);
    const emailRepos = this.connection.getRepository(EmailAccount);

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
    user = await userRepos.persist(user);

    const newMailAccount = Object.assign(new EmailAccount(), { email, password, is_master: true, user, engine });
    emailRepos.persist(newMailAccount);

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
    const userRepository = this.connection.getRepository(User);
    const emailAccsRepository = this.connection.getRepository(EmailAccount);

    const user = await userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('user', 'email_account.user')
      .getOne();
    if (!user) throw Boom.notFound();

    const engine = await this.getEngine(engine_id, new_engine);
    if (!engine) throw Boom.notFound();

    const newAcc = Object.assign(new EmailAccount(), { email, password, is_master: false, engine, user });
    return emailAccsRepository.persist(newAcc);
  }

  async getEngine(engine_id: number, new_engine: EngineValidator) {
    const engineRepos = this.connection.getRepository(Engine);

    if (new_engine) {
      const newEngine = Object.assign(new Engine(), new_engine);
      return engineRepos.persist(newEngine)
    }
    return engineRepos.findOneById(engine_id);
  }
}
