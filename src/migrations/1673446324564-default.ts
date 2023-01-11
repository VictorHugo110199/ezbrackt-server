import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673446324564 implements MigrationInterface {
  name = "default1673446324564";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "photo" character varying, "competitionId" uuid, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "photo" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "competitions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "status" boolean NOT NULL DEFAULT true, "winner" character varying, "number_players" integer NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_ef273910798c3a542b475e75c7d" PRIMARY KEY ("id"))`
    );
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
    await queryRunner.query(`DROP TABLE "competitions"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "players"`);
  }
}
