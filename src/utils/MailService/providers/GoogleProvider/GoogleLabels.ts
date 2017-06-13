import { EmailLabels, EmailServiceCredentials } from '../../../../types';
import * as googleAuth from 'google-auth-library';
import * as google from 'googleapis';

export class GoogleLabels extends EmailLabels {
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
            this.gmail.users.labels.list({
                auth: this.oauth2Client,
                userId: 'me',
            }, (err, response) => {
                if (err) {
                    console.error('The API returned an error: ' + err);
                    return;
                }
                resolve(response.labels);
            });
        })
    }
}