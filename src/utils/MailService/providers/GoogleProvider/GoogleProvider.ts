import { EmailLabels, EmailProvider, EmailServiceCredentials } from '../../../../types';
import { GoogleLabels, GoogleThreads, GoogleMessages } from './';
import * as googleAuth from 'google-auth-library';
import * as google from 'googleapis';
import { EmailAccount } from "../../../../models/EmailAccount";

export class GoogleProvider implements EmailProvider {
  public labels: GoogleLabels;
  public messages: GoogleMessages;
  public threads: GoogleThreads;
  public credentials: EmailServiceCredentials;
  public auth: googleAuth = new googleAuth();
  public oauth2Client: googleAuth.OAuth2;
  public emailAccount: EmailAccount;
  public gmail;

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

    if (this.emailAccount.access_token) {
      this.oauth2Client.credentials = {
        access_token: this.emailAccount.access_token,
        refresh_token: this.emailAccount.refresh_token,
        token_type: this.emailAccount.token_type,
        expiry_date: this.emailAccount.expiry_date
      }
    }
    this.labels = new GoogleLabels(this.oauth2Client, this.gmail);
    this.threads = new GoogleThreads(this.oauth2Client, this.gmail);
    this.messages = new GoogleMessages(this.oauth2Client, this.gmail);

  }

  // TODO: define type for token
  getToken(code: string): any {
    return new Promise((resolve, reject) => {
      this.oauth2Client.getToken(code, (err, tokens) => {
        if (err) return reject(err);
        console.log(tokens);
        resolve(tokens);
      });
    });
  }

  refreshToken(): any {
    return new Promise((resolve, reject) => {
      this.oauth2Client.refreshAccessToken(function (err, tokens) {
        if (err) return reject(err);
        console.log(tokens);
        resolve(tokens);
      });
      
    });
  }

  public async getAuthUrl() {

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://mail.google.com/'],
      state: this.emailAccount.state_code
    });


  }
}