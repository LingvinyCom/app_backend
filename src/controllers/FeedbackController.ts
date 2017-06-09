import {
  JsonController,
  Body,
  Authorized,
  Post,
} from 'routing-controllers';
import { createTransport } from 'nodemailer';

import { BaseController } from './BaseController';
import { Feedback } from "../validation/Feedback";

@JsonController('/feedback')
export class FeedbackController extends BaseController {

  @Post('/')
  @Authorized()
  async send( @Body() feedback: Feedback) {

    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 2525,
      auth: {
        user: "ykrashanovskaya@s-pro.io",
        pass: "test1234567"
      }
    });

    const transporter = createTransport(transport);
    const message = {
      from: 'feedback@server.com',
      to: 'ykrashanovskaya@s-pro.io',
      subject: 'New Feedback',
      text: feedback.text,
    };

    return transporter.sendMail(message);
  }

}
