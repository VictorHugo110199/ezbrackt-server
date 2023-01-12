import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673535564556 implements MigrationInterface {
  name = "default1673535564556";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "brackets" DROP COLUMN "keyRound"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "brackets" ADD "keyRound" integer NOT NULL`);
  }
}
