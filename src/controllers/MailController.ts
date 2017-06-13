import {
  JsonController,
  Body,
  Post,
  Get,
  HttpCode,
  HeaderParam,
  Authorized,
  QueryParam,
  Req
} from 'routing-controllers';
import { Repository } from "typeorm";

import { BaseController } from './BaseController';
import { EmailAccount } from "../models/EmailAccount";
import * as Boom from 'boom';
import { MailService } from "../utils";
import * as Imap from 'imap';
import { inspect } from 'util';
import * as crypto from 'crypto';

@JsonController('/mail')
export class MailController extends BaseController {

  public emailAccountRepository: Repository<EmailAccount>;

  constructor() {
    super();
    this.emailAccountRepository = this.connection.getRepository(EmailAccount);
  };

  @Authorized()
  @Get('/')
  async list( @HeaderParam('authorization') _lingviny_token: string) {

    const emailAccount = await this.getEmailAccount(_lingviny_token);

    if (!emailAccount.token) throw Boom.badRequest('Token needed');

    await this.emailAccountRepository.persist(emailAccount);

    return {};
  }

  @Authorized()
  @Get('/labels/list')
  async labelsList( @HeaderParam('authorization') _lingviny_token: string) {
    const emailAccount = await this.getEmailAccount(_lingviny_token);

    const
      mailService = new MailService(emailAccount),
      list = await mailService.listLabels();
    return list;
  }
  
  @Authorized()
  @Get('/messages/list')
  async messagesList( @HeaderParam('authorization') _lingviny_token: string) {
    const emailAccount = await this.getEmailAccount(_lingviny_token);

    const
      mailService = new MailService(emailAccount),
      list = await mailService.listMessages();
    return list;
  }

  @Authorized()
  @Get('/authUrl')
  async authUrl( @HeaderParam('authorization') _lingviny_token: string) {
    const emailAccount = await this.getEmailAccount(_lingviny_token);

    emailAccount.state_code = crypto.randomBytes(32).toString('hex');

    await this.emailAccountRepository.persist(emailAccount);

    const
      mailService = new MailService(emailAccount),
      url = await mailService.getAuthUrl();

    return url;
  }

  @Get('/auth2callback')
  async auth(
    @QueryParam('state') state_code: string,
    @QueryParam('code') code: string,
  ) {
    let emailAccount = await this
      .emailAccountRepository
      .findOne({
        where: { state_code },
        join: {
          alias: 'emailAccount',
          innerJoinAndSelect: {
            'engine': 'emailAccount.engine'
          }
        }
      });
    if (!emailAccount) throw Boom.badRequest('Wrong user data');

    const mailService = new MailService(emailAccount);
    const { access_token: token, expiry_date: token_expire, token_type } = await mailService.getToken(code);

    emailAccount = { ...emailAccount, token, token_expire, token_type };

    await this.emailAccountRepository.persist(emailAccount);

    return emailAccount;
  }

  async getEmailAccount(_lingviny_token: string): Promise<EmailAccount> {
    let currentUserEmail;

    try {
      currentUserEmail = await this.request
        .get('client/info', { params: { _lingviny_token } })
        .then((res: any) => res.email);
    } catch (e) {
      throw Boom.badRequest('Wrong user data');
    }

    const emailAccount = await this
      .emailAccountRepository
      .findOne({
        where: { email: currentUserEmail },
        join: {
          alias: 'emailAccount',
          innerJoinAndSelect: {
            'engine': 'emailAccount.engine'
          }
        }
      });
    if (!emailAccount) throw Boom.badRequest('Wrong user data');
    return emailAccount;
  }
}
