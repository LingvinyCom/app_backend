import 'reflect-metadata';
import { createKoaServer } from 'routing-controllers';

import { API_PORT } from './config';
import { DataProvider } from './utils';
import * as controllers from './controllers';
import * as models from './models';
import { CustomErrorHandler, AuthorizationChecker } from './middlewares';

(async function start() {
  try {
    await DataProvider.connect(Object.entries(models)
      .map(([key, value]) => value));
    await createKoaServer({
      routePrefix: '/api',
      cors: true,
      defaultErrorHandler: false,
      middlewares: [CustomErrorHandler],
      authorizationChecker: AuthorizationChecker,
      controllers: Object.entries(controllers)
        .map(([key, value]) => value)
    }).listen(API_PORT);
  } catch (e) {
    console.log(e);
  }
})();