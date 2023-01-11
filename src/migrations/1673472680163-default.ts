import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673472680163 implements MigrationInterface {
  name = "default1673472680163";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brackets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currentRound" integer NOT NULL, "keyRound" integer NOT NULL, "status" boolean NOT NULL DEFAULT true, "winnerId" uuid, "loserId" uuid, "competitionId" uuid, "player1Id" uuid, "player2Id" uuid, CONSTRAINT "REL_bb1d00ae75e1c999de3ffa3f65" UNIQUE ("winnerId"), CONSTRAINT "REL_3078be23cf1da9774c6c7e6f6d" UNIQUE ("loserId"), CONSTRAINT "REL_aa04e4738bcb8a8d39bf94e37a" UNIQUE ("player1Id"), CONSTRAINT "REL_faf988814fa486ab2c7aa6f76b" UNIQUE ("player2Id"), CONSTRAINT "PK_557930575b564b859ce0f0c99c5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "players" ADD "inGame" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_bb1d00ae75e1c999de3ffa3f654" FOREIGN KEY ("winnerId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_3078be23cf1da9774c6c7e6f6d1" FOREIGN KEY ("loserId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_d2162c592c3bacb92ebece0b8a1" FOREIGN KEY ("competitionId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_aa04e4738bcb8a8d39bf94e37a7" FOREIGN KEY ("player1Id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_faf988814fa486ab2c7aa6f76b4" FOREIGN KEY ("player2Id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_faf988814fa486ab2c7aa6f76b4"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_aa04e4738bcb8a8d39bf94e37a7"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_d2162c592c3bacb92ebece0b8a1"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_3078be23cf1da9774c6c7e6f6d1"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_bb1d00ae75e1c999de3ffa3f654"`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "inGame"`);
    await queryRunner.query(`DROP TABLE "brackets"`);
  }
}
