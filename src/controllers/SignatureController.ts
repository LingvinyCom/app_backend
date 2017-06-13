import {
  JsonController,
  Body,
  Get,
  Post,
  Param,
  Authorized
} from 'routing-controllers';
import * as Boom from 'boom';

import { BaseController } from './BaseController';
import { Signature as SignatureValidator } from '../validation';
import { Signature } from '../models';

@JsonController('/signature')
export class SignatureController extends BaseController {

  @Get('/:id')
  @Authorized()
  async get(@Param('id') id : number) {
    const user = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.signature', 'signature')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) throw Boom.badData();

    return user.signature || {};
  }

  @Post('/')
  @Authorized()
  async save( @Body() signature: SignatureValidator) {
    const user = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.signature', 'signature')
      .where('user.id = :id', { id: signature.user_id })
      .getOne();
    if (!user) throw Boom.badData();

    if (user.signature){
      user.signature.text = signature.text;
      return this.signatureRepository.persist(user.signature);
    }
    else{
      const newSign = new Signature();
      newSign.text =  signature.text;
      newSign.user = user;
      return this.signatureRepository.persist(newSign);
    }
  }
}
