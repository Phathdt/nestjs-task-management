import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUniqueUsernameIndex1625250545599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD CONSTRAINT users_unique_username UNIQUE (username);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users DROP CONSTRAINT users_unique_username;`,
    );
  }
}
