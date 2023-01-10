import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673380660101 implements MigrationInterface {
  name = "default1673380660101";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_9f74d679c053d66262c3b36c617"`);
    await queryRunner.query(`ALTER TABLE "competitions" DROP CONSTRAINT "FK_d65c4b224335f65e0ea4a045a0c"`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "competitionsId"`);
    await queryRunner.query(`ALTER TABLE "competitions" DROP COLUMN "createUserId"`);
    await queryRunner.query(`ALTER TABLE "players" ADD "photo" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "players" ADD "competitionId" uuid`);
    await queryRunner.query(`ALTER TABLE "competitions" ADD "isActive" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "competitions" ADD "userId" uuid`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "players" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "competitions" DROP CONSTRAINT "UQ_8b88bf405e9d480052de287ac58"`);
    await queryRunner.query(`ALTER TABLE "competitions" ALTER COLUMN "winner" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "competitions" ALTER COLUMN "description" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_b52e712987684be7290bdb8cbed" FOREIGN KEY ("competitionId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "competitions" ADD CONSTRAINT "FK_99b3bc76ddebdbc573b9b288ab2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "competitions" DROP CONSTRAINT "FK_99b3bc76ddebdbc573b9b288ab2"`);
    await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_b52e712987684be7290bdb8cbed"`);
    await queryRunner.query(`ALTER TABLE "competitions" ALTER COLUMN "description" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "competitions" ALTER COLUMN "winner" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "competitions" ADD CONSTRAINT "UQ_8b88bf405e9d480052de287ac58" UNIQUE ("name")`
    );
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "players" ADD "name" character varying(30) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "competitions" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "competitions" DROP COLUMN "isActive"`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "competitionId"`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "photo"`);
    await queryRunner.query(`ALTER TABLE "competitions" ADD "createUserId" uuid`);
    await queryRunner.query(`ALTER TABLE "players" ADD "competitionsId" uuid`);
    await queryRunner.query(`ALTER TABLE "players" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(
      `ALTER TABLE "competitions" ADD CONSTRAINT "FK_d65c4b224335f65e0ea4a045a0c" FOREIGN KEY ("createUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_9f74d679c053d66262c3b36c617" FOREIGN KEY ("competitionsId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
