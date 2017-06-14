import {
  EmailLabels,
  EmailMessages,
  EmailThreads
} from './';
interface EmailProvider {
  labels: EmailLabels;
  messages: EmailMessages;
  getAuthUrl();
  getToken(code: string): Promise<any>;
  refreshToken(): Promise<any>;
}
export default EmailProvider;