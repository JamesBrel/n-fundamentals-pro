import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserPhone1744623968325 implements MigrationInterface {
    name = 'RemoveUserPhone1744623968325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
