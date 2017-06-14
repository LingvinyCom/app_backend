import {
  JsonController,
  Body,
  Get,
  Authorized,
  Post,
  Delete,
  UseBefore,
  State
} from 'routing-controllers';

import { BaseController } from './BaseController';
import { Contact, EmailAccount } from "../models";
import { ContactCreate, ContactDelete } from "../validation";
import { InitEmailAccount } from "../middlewares";

@JsonController('/contact')
export class ContactController extends BaseController {

  @Get('/')
  @Authorized()
  @UseBefore(InitEmailAccount)
  async get( @State('emailAccount') emailAccount: EmailAccount) {
    return this.contactRepository.find({ user: emailAccount.user.id });
  }

  @Post('/')
  @Authorized()
  @UseBefore(InitEmailAccount)
  async add( @Body() contact: ContactCreate,
             @State('emailAccount') emailAccount: EmailAccount) {
    const newContacts = contact.contacts.map(cont => {
      let contact = Object.assign(new Contact(), cont);
      contact.user = emailAccount.user;
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
