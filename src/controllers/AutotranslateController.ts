import {
  JsonController,
  Body,
  Get,
  Authorized,
  Post,
  Param,
  Delete
} from 'routing-controllers';

import { BaseController } from './BaseController';
import { Contact as ContactValidator } from "../validation";
import { Repository } from "typeorm";
import { User, Contact } from "../models";
import * as Boom from "boom";

@JsonController('/signature')
export class AutotranslateController extends BaseController {

  userRepos: Repository<User>;

  constructor() {
    super();
    this.userRepos = this.connection.getRepository(User);
  }

  @Get('/:id')
  @Authorized()
  async get(@Param('id') id : number) {
    const user = await this.userRepos.createQueryBuilder('user')
      .innerJoinAndSelect('user', 'contact.user')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) throw Boom.badData();

    return user.contacts || [];
  }

  @Post('/')
  @Authorized()
  async add( @Body() signature: ContactValidator) {

    const user = await this.userRepos.createQueryBuilder('user')
      .innerJoinAndSelect('user', 'signature.user')
      .where('user.id = :id', { id: signature.user_id })
      .getOne();
    if (!user) throw Boom.badData();

    /*if (user.signature){
      user.signature.text = signature.text;
    }
    else{
      const newSign = new Signature();
      newSign.text =  signature.text;
      user.signature = newSign;
    }

    this.userRepos.persist(user);*/
  }

  @Delete('/')
  @Authorized()
  async delete( @Body() contact: ContactDelete ) {

  }
}
