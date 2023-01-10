import { MigrationInterface, QueryRunner } from "typeorm";

export class DBinit1673362216784 implements MigrationInterface {
  name = "DBinit1673362216784";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "competitionsId" uuid, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bracket_competition" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bracket" character varying NOT NULL, "key_bracket" integer NOT NULL, "player_1_status" character varying NOT NULL DEFAULT 'NotPlay', "player_2_status" character varying NOT NULL DEFAULT 'NotPlay', "status" character varying NOT NULL DEFAULT 'NotPlay', "competitionId" uuid, "player1Id" uuid, "player2Id" uuid, "winnerPlayerId" uuid, CONSTRAINT "PK_196ca5c0bfa8296082cf1e4a567" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "competitions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "status" boolean NOT NULL DEFAULT true, "winner" character varying NOT NULL, "number_players" integer NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b88bf405e9d480052de287ac58" UNIQUE ("name"), CONSTRAINT "PK_ef273910798c3a542b475e75c7d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_9f74d679c053d66262c3b36c617" FOREIGN KEY ("competitionsId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bracket_competition" ADD CONSTRAINT "FK_a56e8235fcdf3c52d5990d5b636" FOREIGN KEY ("competitionId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bracket_competition" ADD CONSTRAINT "FK_67a483c6ee90759968d139f4dc2" FOREIGN KEY ("player1Id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bracket_competition" ADD CONSTRAINT "FK_e0b9dafb186f046ffb606d35c34" FOREIGN KEY ("player2Id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bracket_competition" ADD CONSTRAINT "FK_5bc2dc9e25faef955a4e6191846" FOREIGN KEY ("winnerPlayerId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bracket_competition" DROP CONSTRAINT "FK_5bc2dc9e25faef955a4e6191846"`
    );
    await queryRunner.query(
      `ALTER TABLE "bracket_competition" DROP CONSTRAINT "FK_e0b9dafb186f046ffb606d35c34"`
    );
    await queryRunner.query(
      `ALTER TABLE "bracket_competition" DROP CONSTRAINT "FK_67a483c6ee90759968d139f4dc2"`
    );
    await queryRunner.query(
      `ALTER TABLE "bracket_competition" DROP CONSTRAINT "FK_a56e8235fcdf3c52d5990d5b636"`
    );
    await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_9f74d679c053d66262c3b36c617"`);
    await queryRunner.query(`DROP TABLE "competitions"`);
    await queryRunner.query(`DROP TABLE "bracket_competition"`);
    await queryRunner.query(`DROP TABLE "players"`);
  }
}
