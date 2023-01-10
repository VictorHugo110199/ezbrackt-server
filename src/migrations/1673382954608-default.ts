import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673382954608 implements MigrationInterface {
  name = "default1673382954608";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "players" ALTER COLUMN "photo" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "players" ALTER COLUMN "photo" SET NOT NULL`);
  }
}
