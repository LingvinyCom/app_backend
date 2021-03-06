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
import { inspect } from 'util';
import * as crypto from 'crypto';
import * as Boom from 'boom';

import { BaseController } from './BaseController';
import { EmailAccount } from '../models';
import { MailService } from '../utils';

@JsonController('/mail')
export class MailController extends BaseController {

  @Authorized()
  @Get('/')
  async list( @HeaderParam('authorization') _lingviny_token: string) {
    const emailAccount = await this.getEmailAccount(_lingviny_token);
    if (!emailAccount.access_token) throw Boom.badRequest('Token needed');
    await this.emailAccountRepository.persist(emailAccount);

    return {};
  }

  @Authorized()
  @Get('/labels/list')
  async labelsList( @HeaderParam('authorization') _lingviny_token: string) {
    const
      emailAccount = await this.getEmailAccount(_lingviny_token),
      mailService = await this.getMailService(emailAccount),
      list = await mailService.listLabels();

    return list;
  }

  @Authorized()
  @Get('/messages/list')
  async messagesList( @HeaderParam('authorization') _lingviny_token: string) {
    const
      emailAccount = await this.getEmailAccount(_lingviny_token),
      mailService = await this.getMailService(emailAccount),
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
      mailService = await this.getMailService(emailAccount),
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
    const { access_token, expiry_date, token_type, refresh_token } = await mailService.getToken(code);
    emailAccount = { ...emailAccount, access_token, expiry_date, token_type, refresh_token };
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

  async getMailService(emailAccount) {
    const mailService = new MailService(emailAccount);
    if (+emailAccount.expiry_date < (new Date()).getTime()) {
      const { access_token, expiry_date, token_type, refresh_token } = await mailService.refreshToken();
      emailAccount = { ...emailAccount, access_token, expiry_date, token_type, refresh_token };
      await this.emailAccountRepository.persist(emailAccount);
    }

    return mailService;
  }
}
