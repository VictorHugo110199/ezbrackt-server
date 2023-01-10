import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673366430547 implements MigrationInterface {
  name = "default1673366430547";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "players" ADD "photo" character varying`);
    await queryRunner.query(`ALTER TABLE "competitions" ADD "isActive" boolean NOT NULL DEFAULT true`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "competitions" DROP COLUMN "isActive"`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "photo"`);
  }
}
