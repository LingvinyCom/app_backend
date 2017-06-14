import { KoaMiddlewareInterface } from 'routing-controllers';
import * as Boom from 'boom';

import { request, DataProvider } from '../utils';
import { EmailAccount } from '../models'

export class InitEmailAccount implements KoaMiddlewareInterface {

  async use(context: any, next: (err?: any) => Promise<any>) {
    const _lingviny_token = context.request.headers['authorization'];

    let currentUserEmail;

    try {
      currentUserEmail = await request
        .get('client/info', { params: { _lingviny_token } })
        .then((res: any) => res.email);
    } catch (e) {
      throw Boom.badRequest('Wrong user data');
    }

    const emailAccount = await DataProvider.connection.getRepository(EmailAccount)
      .findOne({
        where: { email: currentUserEmail },
        join: {
          alias: 'emailAccount',
          leftJoinAndSelect: {
            'engine': 'emailAccount.engine',
            'user': 'emailAccount.user'
          }
        }
      });
    if (!emailAccount) throw Boom.badRequest('Wrong user data');
    context.state.emailAccount = emailAccount;

    await next();
  }
}
