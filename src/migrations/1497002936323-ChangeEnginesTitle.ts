import { Connection, EntityManager, MigrationInterface, QueryRunner, Repository } from "typeorm";
import { Engine } from "../models/Engine";

export class ChangeEnginesTitle1497002936323 implements MigrationInterface {

  public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    const engineRepos = connection.getRepository(Engine);
    const changeData = {
      google: 'gmail.com',
      yahoo: 'yahoo.com',
      icloud: 'icloud.com',
      outlook: 'outlook.com',
      aol: 'aol.com',
      yandex: 'yandex.ru',
      mailru: 'mail.ru'
    };

    await this.changeTitles(engineRepos, changeData);
  }

  public async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    const engineRepos = connection.getRepository(Engine);
    const changeData = {
      'gmail.com': 'google',
      'yahoo.com': 'yahoo',
      'icloud.com': 'icloud',
      'outlook.com': 'outlook',
      'aol.com': 'aol',
      'yandex.ru': 'yandex',
      'mail.ru': 'mailru'
    };

    await this.changeTitles(engineRepos, changeData);
  }

  public async changeTitles(engineRepos: Repository<Engine>, changeData: { [ key: string ] : string }): Promise<any> {
    let engines = await engineRepos.find({is_custom: false});

    engines = engines.map(engine => {
      if (engine.title in changeData) {
        engine.title = changeData[engine.title];
      }
      return engine;
    });
    return engineRepos.persist(engines);
  }

}
