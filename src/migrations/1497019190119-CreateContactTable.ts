import {
  ColumnSchema,
  Connection,
  EntityManager,
  MigrationInterface,
  QueryRunner,
  TableSchema
} from "typeorm";

export class CreateContactTable1497019190119 implements MigrationInterface {

  public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    const tableSchema = new TableSchema('contact', [
      new ColumnSchema({ name: 'id', type: 'INTEGER', isPrimary: true, isGenerated: true }),
      new ColumnSchema({ name: 'name', type: 'VARCHAR(255)' }),
      new ColumnSchema({ name: 'email', type: 'VARCHAR(255)' }),
      new ColumnSchema({ name: 'userId', type: 'INTEGER', isNullable: true }),
    ]);
    await queryRunner.createTable(tableSchema);
    await queryRunner.query(`ALTER TABLE contact ADD CONSTRAINT 
      fk_user_contact FOREIGN KEY (userId) REFERENCES user(id)`);
  }

  public async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    await queryRunner.query('ALTER TABLE contact DROP FOREIGN KEY fk_user_contact');
    await queryRunner.query('DROP TABLE contact');
  }

}
