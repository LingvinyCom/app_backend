import { Engine } from "../../models/Engine";
import Credentials from './credentials';
import { EmailServiceCredentials, EmailProvider } from '../../types';

import { EmailAccount } from "../../models/EmailAccount";
import Imap from 'imap';
import * as EmailProviders from './providers';



export class MailService {

  private engine: Engine;
  private credentials: EmailServiceCredentials;
  
  private emailAccount: EmailAccount;
  private provider: EmailProvider;

  constructor(emailAccount: EmailAccount) {

    this.engine = emailAccount.engine;
    this.credentials = Credentials[emailAccount.engine.title];
    this.emailAccount = emailAccount;
    console.log(EmailProviders);
    this.provider = new EmailProviders[emailAccount.engine.title + 'Provider'](this.credentials, this.emailAccount);


    console.log(this.provider);
  }

  


  list() {  

  }

  async getToken(code: string): Promise<any> {

  }
}
