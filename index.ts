import 'reflect-metadata';
import { createKoaServer } from 'routing-controllers';

import { API_PORT } from './src/config';
import { Connector } from './src/utils';
import * as controllers from './src/controllers';

createKoaServer({
  routePrefix: '/api',
  controllers: Object.entries(controllers)
    .map(([key, value]) => value)
}).listen(API_PORT);
