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
    this.provider = new EmailProviders[emailAccount.engine.title + 'Provider'](this.credentials, this.emailAccount);
  }

  listLabels() {
    return this.provider.labels.list();
  }

  listMessages() {
    return this.provider.messages.list();
  }

  async getToken(code: string): Promise<any> {
    return await this.provider.getToken(code);
  }

  async refreshToken(): Promise<any> {
    return await this.provider.refreshToken();
  }

  async getAuthUrl() {
    return await this.provider.getAuthUrl();

  }
}