import {
  JsonController,
  Body,
  Get,
  Post,
  Param,
  Authorized
} from 'routing-controllers';

import { BaseController } from './BaseController';
import { Signature as SignatureValidator } from "../validation";
import { Signature } from "../models";
import { Repository } from "typeorm";
import { User } from "../models/User";
import * as Boom from "boom";

@JsonController('/signature')
export class SignatureController extends BaseController {

  userRepository: Repository<User>;

  constructor() {
    super();
    this.userRepository = this.connection.getRepository(User);
  }

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
    const signatureRepository = this.connection.getRepository(Signature);

    const user = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.signature', 'signature')
      .where('user.id = :id', { id: signature.user_id })
      .getOne();
    if (!user) throw Boom.badData();

    if (user.signature){
      user.signature.text = signature.text;
      return signatureRepository.persist(user.signature);
    }
    else{
      const newSign = new Signature();
      newSign.text =  signature.text;
      newSign.user = user;
      return signatureRepository.persist(newSign);
    }
  }
}
