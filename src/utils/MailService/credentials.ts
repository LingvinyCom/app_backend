import { EmailServiceCredentials } from '../../types';
// TODO: move settings out of here
const Google: EmailServiceCredentials = {

    "client_id": "148064288830-7ntpus14vkpcho3b11u6kgq33u5jdonb.apps.googleusercontent.com",
    "project_id": "lingvy-170206",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "suvaUAmzGZYkSDQosdc8d5l9",
    "redirect_uris": [
        "http://ling-test.com/api/mail/auth2callback"
    ],
    "javascript_origins": [
        "http://ling-test.com"
    ]
}

export default {
    Google
}