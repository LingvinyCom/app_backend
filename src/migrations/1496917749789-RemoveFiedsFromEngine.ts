import { Connection, EntityManager, MigrationInterface, QueryRunner } from "typeorm";

export class RemoveFiedsFromEngine1496917749789 implements MigrationInterface {

  public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    return queryRunner.dropColumns('engine', ['username', 'password']);
  }

  public async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    return queryRunner.query('ALTER TABLE `engine` ADD ( `username` VARCHAR(255), `password` VARCHAR(255) );');
  }

}
