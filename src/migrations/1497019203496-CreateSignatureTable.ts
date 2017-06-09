import { ColumnSchema, Connection, EntityManager, MigrationInterface, QueryRunner, TableSchema } from "typeorm";

export class CreateSignatureTable1497019203496 implements MigrationInterface {

  public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    const tableSchema = new TableSchema('signature', [
      new ColumnSchema({ name: 'id', type: 'int', isPrimary: true }),
      new ColumnSchema({ name: 'text', type: 'text' }),
      new ColumnSchema({ name: 'user', type: 'int' }),
    ]);
    await queryRunner.createTable(tableSchema);
  }

  public async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    await queryRunner.truncate('signature');
  }

}
