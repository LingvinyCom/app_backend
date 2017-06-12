import {
  JsonController,
  Body,
  Get,
  Authorized,
  Post,
  Param,
  Delete
} from 'routing-controllers';

import { Repository } from "typeorm";
import * as Boom from "boom";

import { BaseController } from './BaseController';
import { User, Contact } from "../models";
import { ContactCreate } from "../validation/ContactCreate";
import { ContactDelete } from "../validation/ContactDelete";

@JsonController('/contact')
export class ContactController extends BaseController {

  userRepos: Repository<User>;
  contactRepos: Repository<Contact>;

  constructor() {
    super();
    this.userRepos = this.connection.getRepository(User);
    this.contactRepos = this.connection.getRepository(Contact);
  }

  @Get('/:id')
  @Authorized()
  async get(@Param('id') id: number) {
    const user = await this.userRepos.createQueryBuilder('user')
      .leftJoinAndSelect('user.contacts', 'contacts')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) throw Boom.badData();

    return user.contacts || [];
  }

  @Post('/')
  @Authorized()
  async add(@Body() contact: ContactCreate) {
    const user = await this.userRepos.createQueryBuilder('user')
      .leftJoinAndSelect('user.contacts', 'contacts')
      .where('user.id = :id', { id: contact.user_id })
      .getOne();
    if (!user) throw Boom.badData();

    const newContacts = contact.contacts.map(cont => {
      let contact = Object.assign(new Contact(), cont);
      contact.user = user;
      return contact;
    });

    return this.contactRepos.persist(newContacts);
  }

  @Delete('/')
  @Authorized()
  async delete(@Body() contact: ContactDelete) {
    return this.contactRepos.removeById(contact.contact_id);
  }
}
