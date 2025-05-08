import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatorIdToUser1746688848066 implements MigrationInterface {
    name = 'AddCreatorIdToUser1746688848066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "creator_id" integer
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "creator_id"
        `);
    }

}
