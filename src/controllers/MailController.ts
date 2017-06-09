import { JsonController, Body, Post, Get, HttpCode, HeaderParam, Authorized } from 'routing-controllers';

import { BaseController } from './BaseController';
import { EmailAccount } from "../models/EmailAccount";
import * as Boom from 'boom';
import { MailService } from "../utils";
import * as Imap from 'imap';
import { inspect } from 'util';

@JsonController('/mail')
export class MailController extends BaseController {

  @Authorized()
  @Get('/')
  async list( @HeaderParam('authorization') _lingviny_token: string) {

    let currentUserEmail;
    try {
      currentUserEmail = await this.request
        .get('client/info', { params: { _lingviny_token } })
        .then((res: any) => res.email);
    } catch (e) {
      throw Boom.badRequest('Wrong user data');
    }

    const user = await this.connection
      .getRepository(EmailAccount)
      .findOne({
        where: { email: currentUserEmail },
        join: {
          alias: 'user',
          innerJoinAndSelect: {
            'engine': 'user.engine'
          }
        }
      });
    if (!user) throw Boom.badRequest('Wrong user data');

    const mailService = new MailService(user.engine);
    return mailService.test()
  }

}
