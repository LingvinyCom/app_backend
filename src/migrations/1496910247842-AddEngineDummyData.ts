import {Connection, EntityManager, MigrationInterface, QueryRunner} from "typeorm";
import { Engine } from "../models/Engine";

export class AddEngineDummyData1496910247842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
        const engineRepos = connection.getRepository(Engine);
        const enginesData = [
            {
                title: 'Google',
                host: 'imap.gmail.com',
                server_port: 993,
                is_ssl: true,
                is_custom: false
            },
            {
                title: 'ICloud',
                host: 'imap.mail.me.com',
                server_port: 993,
                is_ssl: true,
                is_custom: false
            },
            {
                title: 'Microsoft Exchange',
                host: '',
                server_port: 993,
                is_ssl: true,
                is_custom: false
            },
            {
                title: 'Yahoo',
                host: 'imap.mail.yahoo.com',
                server_port: 993,
                is_ssl: true,
                is_custom: false
            },
            {
                title: 'Aol',
                host: 'imap.aol.com',
                server_port: 993,
                is_ssl: true,
                is_custom: false
            },
            {
                title: 'Outlook',
                host: 'imap-mail.outlook.com',
                server_port: 993,
                is_ssl: true,
                is_custom: false
            },
            {
                title: 'Mail.ru',
                host: 'imap.mail.ru',
                server_port: 993,
                is_ssl: true,
                is_custom: false
            },
            {
                title: 'Yandex',
                host: 'imap.yandex.ru',
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
        const engines = await engineRepos.find({ is_custom: false });
        await engineRepos.remove(engines)
    }

}
