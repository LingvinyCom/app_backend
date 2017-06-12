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
import {ContactDelete} from "../validation/ContactDelete";

@JsonController('/contact')
export class ContactController extends BaseController {

  userRepos: Repository<User>;

  constructor() {
    super();
    this.userRepos = this.connection.getRepository(User);
  }

  @Get('/:id')
  @Authorized()
  async get(@Param('id') id : number) {
    const user = await this.userRepos.createQueryBuilder('user')
      .leftJoinAndSelect('user.contacts', 'contacts')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) throw Boom.badData();

    return user.contacts || [];
  }

  @Post('/')
  @Authorized()
  async add( @Body() contact: ContactCreate) {
    const contactRepos = this.connection.getRepository(Contact);

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

    return contactRepos.persist(newContacts);
  }

  @Delete('/')
  @Authorized()
  async delete( @Body() delContact: ContactDelete ) {
    const contactRepos = this.connection.getRepository(Contact);

    const contact = await contactRepos.findOneById(delContact.contact_id);
    if (!contact) throw Boom.badData();

    return contactRepos.remove(contact);
  }
}
