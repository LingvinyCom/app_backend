import { Engine } from "../../models/Engine";
import Credentials from './credentials';
import { EmailServiceCredentials } from '../../types';
import * as ClientOAuth2 from 'client-oauth2';
import * as google from 'googleapis';
import { EmailAccount } from "../../models/EmailAccount";
import Imap from 'imap';

import * as googleAuth from 'google-auth-library';

export class MailService {

  private engine: Engine;
  private credentials: EmailServiceCredentials;
  private mailAuth: ClientOAuth2;
  private emailAccount: EmailAccount;

  constructor(emailAccount: EmailAccount) {

    this.engine = emailAccount.engine;
    this.credentials = Credentials[emailAccount.engine.title];
    this.emailAccount = emailAccount;
    this.mailAuth = new ClientOAuth2({
      clientId: this.credentials.client_id,
      clientSecret: this.credentials.client_secret,
      accessTokenUri: this.credentials.token_uri,
      authorizationUri: this.credentials.auth_uri,
      redirectUri: this.credentials.redirect_uris[0],
      scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
      state: emailAccount.state_code,

    });

  }

  async getAuthUrl() {
    return this.mailAuth.code.getUri()
  }


  list() {
    const
      auth = new googleAuth(),
      oauth2Client = new auth.OAuth2(
        this.credentials.client_id,
        this.credentials.client_secret,
        this.credentials.redirect_uris[0]
      );

    if (this.emailAccount.token) {
      oauth2Client.credentials = {
        access_token: this.emailAccount.token,
        token_type: this.emailAccount.token_type,
        expiry_date: this.emailAccount.token_expire
      }
    }

    const gmail = google.gmail('v1');
    console.log(gmail.users);
    gmail.users.threads.list({
      auth: oauth2Client,
      userId: 'me',
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }

      response.threads.forEach(thread => {
        gmail.users.threads.get({
          auth: oauth2Client,
          userId: 'me',
          id: thread.id
        }, (err, res) => {
          if (err) return console.log(err);
          console.log(res);
        });

      })

    });
  }

  async getToken(code: string): Promise<any> {
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(
      this.credentials.client_id,
      this.credentials.client_secret,
      this.credentials.redirect_uris[0]);
    const token = await new Promise((resolve, reject) => {
      oauth2Client.getToken(code, (err, token) => {
        if (err) return reject(err);
        console.log(token);
        resolve(token);
      });
    });

    return token;
  }
}
