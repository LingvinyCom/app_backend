import { ColumnSchema, Connection, EntityManager, MigrationInterface, QueryRunner, TableSchema } from "typeorm";

export class CreateContactTable1497019190119 implements MigrationInterface {

  public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    const tableSchema = new TableSchema('contact', [
      new ColumnSchema({ name: 'id', type: 'int', isPrimary: true }),
      new ColumnSchema({ name: 'name' }),
      new ColumnSchema({ name: 'email' }),
      new ColumnSchema({ name: 'user', type: 'int' }),
    ]);
    await queryRunner.createTable(tableSchema);
  }

  public async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    await queryRunner.truncate('contact');
  }

}
