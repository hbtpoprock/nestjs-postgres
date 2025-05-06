import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToUser1746438465520 implements MigrationInterface {
    name = 'AddIsActiveToUser1746438465520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "isActive"
        `);
    }

}
