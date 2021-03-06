import { createConnection, Connection, Entity } from 'typeorm';

import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './../config';

class Provider {

  public connection: Connection;

  connect(entities: Array<Function>): Promise<Connection> {
    return createConnection({
      entities,
      migrations:  [ __dirname + 'migrations/*.ts' ],
      autoSchemaSync: false,
      driver: {
        type: 'mysql',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
      }
    }).then((conn: Connection) => {
      this.connection = conn;
      return conn;
    });
  }
}

export const DataProvider = new Provider();
