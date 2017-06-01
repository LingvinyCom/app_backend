import { createConnection, Connection, Entity } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export function Connector(entities: Array<Function>): Promise<Connection> {
  return createConnection({
    entities,
    driver: {
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    }
  });
}
