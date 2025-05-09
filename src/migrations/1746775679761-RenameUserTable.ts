import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserTable1746775679761 implements MigrationInterface {
  name = 'RenameUserTable1746775679761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('user', 'users');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('users', 'user');
  }
}
