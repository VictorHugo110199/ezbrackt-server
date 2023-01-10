import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673380282149 implements MigrationInterface {
  name = "default1673380282149";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "photo" character varying NOT NULL, "competitionId" uuid, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_b52e712987684be7290bdb8cbed" FOREIGN KEY ("competitionId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_b52e712987684be7290bdb8cbed"`);
    await queryRunner.query(`DROP TABLE "players"`);
  }
}
