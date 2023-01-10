import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673367163161 implements MigrationInterface {
  name = "default1673367163161";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "competitions" DROP CONSTRAINT "UQ_8b88bf405e9d480052de287ac58"`);
    await queryRunner.query(`ALTER TABLE "competitions" ALTER COLUMN "winner" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "competitions" ALTER COLUMN "description" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "competitions" ALTER COLUMN "description" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "competitions" ALTER COLUMN "winner" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "competitions" ADD CONSTRAINT "UQ_8b88bf405e9d480052de287ac58" UNIQUE ("name")`
    );
  }
}
