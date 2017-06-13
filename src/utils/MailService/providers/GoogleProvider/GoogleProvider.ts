import { EmailLabels, EmailProvider, EmailServiceCredentials } from '../../../../types';
import { GoogleLabels, GoogleThreads, GoogleMessages } from './';
import * as googleAuth from 'google-auth-library';
import * as google from 'googleapis';
import { EmailAccount } from "../../../../models/EmailAccount";
import * as ClientOAuth2 from 'client-oauth2';

export class GoogleProvider implements EmailProvider {
  public labels: GoogleLabels;
  public messages: GoogleMessages;
  public threads: GoogleThreads;
  public credentials: EmailServiceCredentials;
  public auth: googleAuth = new googleAuth();
  public oauth2Client: googleAuth.OAuth2;
  public emailAccount: EmailAccount;
  public gmail;
  private mailAuth: ClientOAuth2;

  constructor(
    credentials: EmailServiceCredentials,
    emailAccount: EmailAccount
  ) {
    this.gmail = google.gmail('v1');
    this.credentials = credentials;
    this.emailAccount = emailAccount;

    this.oauth2Client = new this.auth.OAuth2(
      this.credentials.client_id,
      this.credentials.client_secret,
      this.credentials.redirect_uris[0]
    );

    if (this.emailAccount.token) {
      this.oauth2Client.credentials = {
        access_token: this.emailAccount.token,
        token_type: this.emailAccount.token_type,
        expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 365)
      }
    }
    this.labels = new GoogleLabels(this.oauth2Client, this.gmail);
    this.threads = new GoogleThreads(this.oauth2Client, this.gmail);
    this.messages = new GoogleMessages(this.oauth2Client, this.gmail);

  }

  // TODO: define type for token
  async getToken(code: string): Promise<any> {
    const token = await new Promise((resolve, reject) => {
      this.oauth2Client.getToken(code, (err, token) => {
        console.error(err);
        if (err) return reject(err);
        resolve(token);
      });
    });

    return token;
  }

  public async getAuthUrl() {
    this.mailAuth = new ClientOAuth2({
      clientId: this.credentials.client_id,
      clientSecret: this.credentials.client_secret,
      accessTokenUri: this.credentials.token_uri,
      authorizationUri: this.credentials.auth_uri,
      redirectUri: this.credentials.redirect_uris[0],
      scopes: [
        'https://mail.google.com/',
        // 'https://www.googleapis.com/auth/gmail.modify',
        // 'https://www.googleapis.com/auth/gmail.readonly',
        // 'https://www.googleapis.com/auth/gmail.labels',
        // 'https://www.googleapis.com/auth/gmail.metadata'
      ],
      state: this.emailAccount.state_code,

    });
    return this.mailAuth.code.getUri();
  }
}