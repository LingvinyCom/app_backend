import { JsonController, Body, Post, Get, HttpCode, HeaderParam, Authorized } from 'routing-controllers';

import { BaseController } from './BaseController';
import { EmailAccount } from "../models/EmailAccount";
import * as Boom from 'boom';
import { MailService } from "../utils/MailService";

@JsonController('/mail')
export class MailController extends BaseController {

  @Authorized()
  @Get('/')
  async list( @HeaderParam('authorization') _lingviny_token: string ) {

    let currentUserEmail;
    try{
      currentUserEmail = await this.request
        .get('client/info', { params: { _lingviny_token } } )
        .then((res : any)  => res.email);
    } catch (e) {
      throw Boom.badRequest('Wrong user data');
    }

    const user = await this.connection
      .getRepository(EmailAccount)
      .findOne( { email: currentUserEmail } );
    if (!user) throw Boom.badRequest('Wrong user data');

    const mailService = new MailService(user.engine);
    return mailService.list()
  }

}
