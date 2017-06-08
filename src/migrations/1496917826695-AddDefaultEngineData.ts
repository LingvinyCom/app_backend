import { Connection, EntityManager, MigrationInterface, QueryRunner } from "typeorm";
import { Engine } from "../models/Engine";

export class AddDefaultEngineData1496917826695 implements MigrationInterface {

  public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    const engineRepos = connection.getRepository(Engine);
    const enginesData = [
      {
        title: 'google',
        host: 'imap.gmail.com',
        server_port: 993,
        is_ssl: true,
        is_custom: false
      },
      {
        title: 'icloud',
        host: 'imap.mail.me.com',
        server_port: 993,
        is_ssl: true,
        is_custom: false
      },
      {
        title: 'yahoo',
        host: 'imap.mail.yahoo.com',
        server_port: 993,
        is_ssl: true,
        is_custom: false
      },
      {
        title: 'aol',
        host: 'imap.aol.com',
        server_port: 993,
        is_ssl: true,
        is_custom: false
      },
      {
        title: 'exchange',
        host: '',
        server_port: 993,
        is_ssl: true,
        is_custom: false
      },
      {
        title: 'outlook',
        host: 'imap-mail.outlook.com',
        server_port: 993,
        is_ssl: true,
        is_custom: false
      },
      {
        title: 'yandex',
        host: 'imap.yandex.ru',
        server_port: 993,
        is_ssl: true,
        is_custom: false
      },
      {
        title: 'mailru',
        host: 'imap.mail.ru',
        server_port: 993,
        is_ssl: true,
        is_custom: false
      },
    ];
    const engines = enginesData.map(engine => Object.assign(new Engine(), engine));
    await engineRepos.persist(engines);
  }

  public async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    const engineRepos = connection.getRepository(Engine);
    const engines = await engineRepos.find({is_custom: false});
    await engineRepos.remove(engines);
  }

}
