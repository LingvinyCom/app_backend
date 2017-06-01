import 'reflect-metadata';
import { createKoaServer } from 'routing-controllers';

import { API_PORT } from './src/config';
import { Connector } from './src/utils';
import * as controllers from './src/controllers';
import { CustomErrorHandler } from './src/middlewares';

createKoaServer({
  routePrefix: '/api',
  cors: true,
  defaultErrorHandler: false,
  middlewares: [CustomErrorHandler],
  controllers: Object.entries(controllers)
    .map(([key, value]) => value)
}).listen(API_PORT);
