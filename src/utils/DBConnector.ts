import { createConnection, Connection, Entity } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export function Connector(e: Array<any>): Promise<Connection> {
  return createConnection({
    driver: {
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    },
    entities: e
  });
}