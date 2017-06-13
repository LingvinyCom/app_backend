import { EmailThreads, EmailServiceCredentials } from '../../../../types';
import * as googleAuth from 'google-auth-library';
import * as google from 'googleapis';

export class GoogleThreads extends EmailThreads {
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
        this.gmail.users.threads.list({
            auth: this.oauth2Client,
            userId: 'me',
        }, (err, response) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            response.threads.forEach(thread => {
                this.gmail.users.threads.get({
                    auth: this.oauth2Client,
                    userId: 'me',
                    id: thread.id
                }, (err, res) => {
                    if (err) return console.log(err);
                    console.log(res);
                });

            })

        });
    }
}