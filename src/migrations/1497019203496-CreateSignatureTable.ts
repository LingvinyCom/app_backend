import {
  ColumnSchema,
  Connection,
  EntityManager,
  MigrationInterface,
  QueryRunner,
  TableSchema
} from "typeorm";

export class CreateSignatureTable1497019203496 implements MigrationInterface {

  public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    const tableSchema = new TableSchema('signature', [
      new ColumnSchema({ name: 'id', type: 'INTEGER', isPrimary: true, isGenerated: true }),
      new ColumnSchema({ name: 'text', type: 'TEXT' }),
      new ColumnSchema({ name: 'userId', type: 'INTEGER', isNullable: true }),
    ]);
    await queryRunner.createTable(tableSchema);
    await queryRunner.query(`ALTER TABLE signature ADD CONSTRAINT 
      fk_user_signature FOREIGN KEY (userId) REFERENCES user(id)`);
  }

  public async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    await queryRunner.query('ALTER TABLE signature DROP FOREIGN KEY fk_user_signature');
    await queryRunner.query('DROP TABLE signature');
  }

}
