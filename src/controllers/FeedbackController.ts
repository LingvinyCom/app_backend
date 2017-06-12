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
      port: 587,
      auth: {
        user: "ykrashanovskaya@s-pro.io",
        pass: "test1234567"
      }
    });

    const message = {
      to: 'team@lingviny.com',
      subject: 'New Feedback',
      text: feedback.text,
    };

    return transport.sendMail(message);
  }

}
