import {
  JsonController,
  Body,
  Get,
  Post,
  Authorized,
  UseBefore,
  State
} from 'routing-controllers';
import * as Boom from 'boom';

import { BaseController } from './BaseController';
import { Signature as SignatureValidator } from '../validation';
import { Signature, EmailAccount } from '../models';
import { InitEmailAccount } from '../middlewares';

@JsonController('/signature')
export class SignatureController extends BaseController {

  @Get('/')
  @Authorized()
  @UseBefore(InitEmailAccount)
  async get( @State('emailAccount') emailAccount: EmailAccount) {
    const signature = await this.signatureRepository.findOne({ user: emailAccount.user.id }) ;
    return signature || { text: 'Sent with Lingviny' };
  }

  @Post('/')
  @Authorized()
  @UseBefore(InitEmailAccount)
  async save( @Body() signatureData: SignatureValidator,
              @State('emailAccount') emailAccount: EmailAccount) {
    const signature = await this.signatureRepository.findOne({ user: emailAccount.user.id }) ;

    if (signature){
      signature.text = signatureData.text;
      return this.signatureRepository.persist(signature);
    }
    else{
      const newSign = new Signature();
      newSign.text =  signatureData.text;
      newSign.user = emailAccount.user;
      return this.signatureRepository.persist(newSign);
    }
  }
}
