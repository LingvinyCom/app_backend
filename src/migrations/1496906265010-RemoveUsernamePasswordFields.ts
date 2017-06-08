import {Connection, EntityManager, MigrationInterface, QueryRunner} from "typeorm";
import { Engine } from "../models/Engine";


export class RemoveUsernamePasswordFields1496906265010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
        await queryRunner.dropColumns('engine', [ 'username', 'password' ]);
    }

    public async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
        await queryRunner.addColumns('engine', [ 'username', 'password' ]);
    }

}
