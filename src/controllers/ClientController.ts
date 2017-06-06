import { JsonController, Body, Post, Authorized, HttpCode, Param } from 'routing-controllers';
import { stringify } from 'query-string';

import { BaseController } from './BaseController';
import { Client, EmailAccount as EmailAccValidator } from './../validation';
import { User } from "../models/User";
import { EmailAccount } from "../models/EmailAccount";
import * as Boom from "boom";
import { Engine } from "../models/Engine";
import { Engine as EngineValidator } from "../validation/Engine";

@JsonController('/client')
export class ClientController extends BaseController {

  @Post('/create')
  async create(@Body({required: true}) client: Client) {
    const userRepos = this.connection.getRepository(User);
    const emailRepos = this.connection.getRepository(EmailAccount);

    const { email, password, engine_id, new_engine } = client;

    // Check if getting email is already master for some client
    const existEmail = await emailRepos.findOne({email, is_master: true});
    if (existEmail) throw Boom.badData('Email is already registered!');

    let token = 'sdgsdg';
    try {

      token = await this.request.post(`/client/create?${stringify({email, password})}`)
        .then((res: any) => res.lingviny_token);

    } catch (e) {
      console.log(e);
    }

    const engine = await this.getEngine(engine_id, new_engine);
    if (!engine) throw Boom.notFound();

    let newUser = new User();
    newUser.token = token;
    newUser = await userRepos.persist(newUser);

    let newMailAccount = new EmailAccount();
    newMailAccount.email = email;
    newMailAccount.password = password;
    newMailAccount.is_master = true;
    newMailAccount.user = newUser;
    newMailAccount.engine = engine;
    emailRepos.persist(newMailAccount);

    return newUser;
  }

  @Authorized()
  @Post('/:id/add-email')
  async addEmail(@Body() credentials: EmailAccValidator,
                 @Param("id") id: number) {
    const { email, password, engine_id, new_engine } = credentials;
    const userRepository = this.connection.getRepository(User);
    const emailAccsRepository = this.connection.getRepository(EmailAccount);

    const user = await userRepository.createQueryBuilder("user")
      .innerJoinAndSelect("user", "email_account.user")
      .getOne();
    if (!user) throw Boom.notFound();

    const engine = await this.getEngine(engine_id, new_engine);
    if (!engine) throw Boom.notFound();

    let newAcc = new EmailAccount();
    newAcc.email = email;
    newAcc.password = password;
    newAcc.is_master = false;
    newAcc.engine = engine;
    newAcc.user = user;

    return emailAccsRepository.persist(newAcc);
  }

  @Post('/engines')
  async emailEngines() {
    return await this.connection.getRepository(Engine).find({is_custom: false});
  }

  async getEngine(engine_id: number, new_engine: EngineValidator) {
    const engineRepos = this.connection.getRepository(Engine);

    if (new_engine) {
      const newEngine = Object.assign(new Engine(), new_engine);
      return engineRepos.persist(newEngine)
    }
    else {
      return engineRepos.findOneById(engine_id);
    }
  }
}
