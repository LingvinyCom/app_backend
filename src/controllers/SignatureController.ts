import {
  JsonController,
  Body,
  Get,
  Post,
  Param,
  Authorized
} from 'routing-controllers';

import { BaseController } from './BaseController';
import { Signature as SignatureValidator } from "../validation/Signature";
import { Signature } from "../models/Signature";
import { Repository } from "typeorm";
import { User } from "../models/User";
import * as Boom from "boom";

@JsonController('/signature')
export class SignatureController extends BaseController {

  userRepos: Repository<User>;

  constructor() {
    super();
    this.userRepos = this.connection.getRepository(User);
  }

  @Get('/:id')
  @Authorized()
  async get(@Param('id') id : number) {
    const user = await this.userRepos.createQueryBuilder('user')
      .leftJoinAndSelect('user.signature', 'signature')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) throw Boom.badData();

    return user.signature || {};
  }

  @Post('/')
  @Authorized()
  async save( @Body() signature: SignatureValidator) {
    const signRepos = this.connection.getRepository(Signature);

    const user = await this.userRepos.createQueryBuilder('user')
      .leftJoinAndSelect('user.signature', 'signature')
      .where('user.id = :id', { id: signature.user_id })
      .getOne();
    if (!user) throw Boom.badData();

    if (user.signature){
      user.signature.text = signature.text;
      return signRepos.persist(user.signature);
    }
    else{
      const newSign = new Signature();
      newSign.text =  signature.text;
      newSign.user = user;
      return signRepos.persist(newSign);
    }
  }
}
