import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673440616656 implements MigrationInterface {
  name = "default1673440616656";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_9f74d679c053d66262c3b36c617"`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "competitionsId"`);
    await queryRunner.query(`ALTER TABLE "players" ADD "competitionId" uuid`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "players" ADD "name" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_b52e712987684be7290bdb8cbed" FOREIGN KEY ("competitionId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_b52e712987684be7290bdb8cbed"`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "players" ADD "name" character varying(30) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "competitionId"`);
    await queryRunner.query(`ALTER TABLE "players" ADD "competitionsId" uuid`);
    await queryRunner.query(`ALTER TABLE "players" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_9f74d679c053d66262c3b36c617" FOREIGN KEY ("competitionsId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
