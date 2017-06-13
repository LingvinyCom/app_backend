import { EmailLabels, EmailProvider, EmailServiceCredentials } from '../../../../types';
import { GoogleLabels } from './';
import * as googleAuth from 'google-auth-library';
import * as google from 'googleapis';
import { EmailAccount } from "../../../../models/EmailAccount";
import * as ClientOAuth2 from 'client-oauth2';

export class GoogleProvider implements EmailProvider {
  public labels: GoogleLabels;
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
    this.labels = new GoogleLabels(this.credentials, this.gmail);
    this.emailAccount = emailAccount;

    this.oauth2Client = new this.auth.OAuth2(
      this.credentials.client_id,
      this.credentials.client_secret,
      this.credentials.redirect_uris[0]
    );
    console.log(emailAccount);
    if (this.emailAccount.token) {
      this.oauth2Client.credentials = {
        access_token: this.emailAccount.token,
        token_type: this.emailAccount.token_type,
        expiry_date: this.emailAccount.token_expire
      }
    }

  }

  async getToken(code: string): Promise<any> {
    const token = await new Promise((resolve, reject) => {
      this.oauth2Client.getToken(code, (err, token) => {
        if (err) return reject(err);
        console.log(token);
        resolve(token);
      });
    });

    return token;
  }

  async getAuthUrl() {
    this.mailAuth = new ClientOAuth2({
      clientId: this.credentials.client_id,
      clientSecret: this.credentials.client_secret,
      accessTokenUri: this.credentials.token_uri,
      authorizationUri: this.credentials.auth_uri,
      redirectUri: this.credentials.redirect_uris[0],
      scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
      state: this.emailAccount.state_code,

    });
    return this.mailAuth.code.getUri();
  }
}