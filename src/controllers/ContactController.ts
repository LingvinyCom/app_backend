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

  userRepository: Repository<User>;
  contactRepository: Repository<Contact>;

  constructor() {
    super();
    this.userRepository = this.connection.getRepository(User);
    this.contactRepository = this.connection.getRepository(Contact);
  }

  @Get('/:id')
  @Authorized()
  async get(@Param('id') id: number) {
    const user = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.contacts', 'contacts')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) throw Boom.badData();

    return user.contacts || [];
  }

  @Post('/')
  @Authorized()
  async add(@Body() contact: ContactCreate) {
    const user = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.contacts', 'contacts')
      .where('user.id = :id', { id: contact.user_id })
      .getOne();
    if (!user) throw Boom.badData();

    const newContacts = contact.contacts.map(cont => {
      let contact = Object.assign(new Contact(), cont);
      contact.user = user;
      return contact;
    });

    return this.contactRepository.persist(newContacts);
  }

  @Delete('/')
  @Authorized()
  async delete(@Body() contact: ContactDelete) {
    return this.contactRepository.removeById(contact.contact_id);
  }
}
