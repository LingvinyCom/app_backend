import {
  JsonController,
  Body,
  Get,
  HttpCode,
  HeaderParam,
  Authorized,
  Post,
  Put, BodyParam, Param
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
      .innerJoinAndSelect('user', 'signature.user')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) throw Boom.badData();

    if (user.signature){
      return user.signature.text;
    }
    return '';
  }

  @Post('/')
  @Authorized()
  async save( @Body() signature: SignatureValidator) {

    const user = await this.userRepos.createQueryBuilder('user')
      .innerJoinAndSelect('user', 'signature.user')
      .where('user.id = :id', { id: signature.user_id })
      .getOne();
    if (!user) throw Boom.badData();

    if (user.signature){
      user.signature.text = signature.text;
    }
    else{
      const newSign = new Signature();
      newSign.text =  signature.text;
      user.signature = newSign;
    }

    this.userRepos.persist(user);
  }
}
