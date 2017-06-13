import { EmailMessages, EmailServiceCredentials } from '../../../../types';
import * as googleAuth from 'google-auth-library';
import * as google from 'googleapis';

export class GoogleMessages extends EmailMessages {
    private oauth2Client: googleAuth.OAuth2;
    private gmail: google.gmail;
    constructor(
        oauth2Client: googleAuth.OAuth2,
        gmail: google.gmail
    ) {
        super();
        this.oauth2Client = oauth2Client;
        this.gmail = gmail;
    }
    list() {
        return new Promise((resolve, reject) => {
            this.gmail.users.messages.list({
                auth: this.oauth2Client,
                userId: 'me',
            }, (err, response) => {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return reject(err);
                }
                resolve(Promise.all(response.messages.map(message => this.get(message.id))));
            });
        })

    }
    get(messageId: string) {
        return new Promise((resolve, reject) => {
            this.gmail.users.messages.get({
                auth: this.oauth2Client,
                userId: 'me',
                id: messageId
            }, (err, res) => {
                if (err) return console.log(err);
                resolve(res);
            });

        })
    }
}