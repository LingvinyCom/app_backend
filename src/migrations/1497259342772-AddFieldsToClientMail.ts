import { Connection, EntityManager, MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldsToClientMail1497259342772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
        return queryRunner.query('ALTER TABLE `email_account` ADD ( `state_code` VARCHAR(255), `access_token` VARCHAR(255), `token_type` VARCHAR(255), `expiry_date` VARCHAR(255), `refresh_token` VARCHAR(255));');
    }

    public async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
        return queryRunner.dropColumns('email_account', ['state_code', 'access_token', 'token_type', 'expiry_date', 'refresh_token']);
    }

}
