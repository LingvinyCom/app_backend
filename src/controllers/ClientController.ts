import {JsonController, Body, Post, Authorized, HttpCode, Param} from 'routing-controllers';
import {stringify} from 'query-string';

import {BaseController} from './BaseController';
import {Client, EmailAccount as emv} from './../validation';
import {User} from "../models/User";
import {EmailAccount} from "../models/EmailAccount";
import * as Boom from "boom";
import {Engine} from "../models/Engine";

@JsonController('/client')
export class ClientController extends BaseController {

  @Post('/create')
  async create(@Body({required: true}) client: Client) {
    const userRepos = this.connection.getRepository(User);
    const emailRepos = this.connection.getRepository(EmailAccount);

    const { email, password } = client;
    let token = 'sdgsdg';
    try {

      token = await this.request.post(`/client/create?${stringify({email, password})}`)
        .then((res: any) => res.lingviny_token);

    } catch (e) {

    }
    let newUser = new User();
    let newMailAccount = new EmailAccount();
    newUser.token = token;

    newMailAccount.email = email;
    newMailAccount.password = password;
    newMailAccount.is_master = true;
    emailRepos.persist(newMailAccount);

    return userRepos.persist(newUser);
  }

  @Authorized()
  @HttpCode(204)
  @Post('/:id/add_email')
  async addEmail( @Body() credentials: emv,
                  @Param("id") id: number) {
    const { email, password, engine_id } = credentials;

    let userRepository = this.connection.getRepository(User);
    let emailAccsRepository = this.connection.getRepository(EmailAccount);
    let engineRepository = this.connection.getRepository(Engine);

    let newAcc = new EmailAccount();
    const engine = await engineRepository.findOneById(engine_id);
    if (!engine) throw Boom.notFound();
    newAcc.email = email;
    newAcc.password = password;
    newAcc.engine = engine;
    newAcc.is_master = false;

    const user = await userRepository.createQueryBuilder("user")
      .innerJoinAndSelect("user", "email_account.user")
      .getOne();

    if (!user) throw Boom.notFound();
    newAcc.user = user;

    if (!user.email_accounts) user.email_accounts = [newAcc];
    else user.email_accounts.push(newAcc);

    await userRepository.persist(user);
    return emailAccsRepository.persist(newAcc);
  }
}
