import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674062393157 implements MigrationInterface {
    name = 'default1674062393157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "photo" character varying, "competitionId" uuid, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "photo" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "competitions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "status" boolean NOT NULL DEFAULT true, "winner" character varying, "number_players" integer NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_ef273910798c3a542b475e75c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brackets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currentRound" integer NOT NULL, "status" boolean NOT NULL DEFAULT true, "winnerId" uuid, "loserId" uuid, "competitionId" uuid, "player1Id" uuid, "player2Id" uuid, CONSTRAINT "PK_557930575b564b859ce0f0c99c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_b52e712987684be7290bdb8cbed" FOREIGN KEY ("competitionId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competitions" ADD CONSTRAINT "FK_99b3bc76ddebdbc573b9b288ab2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brackets" ADD CONSTRAINT "FK_bb1d00ae75e1c999de3ffa3f654" FOREIGN KEY ("winnerId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brackets" ADD CONSTRAINT "FK_3078be23cf1da9774c6c7e6f6d1" FOREIGN KEY ("loserId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brackets" ADD CONSTRAINT "FK_d2162c592c3bacb92ebece0b8a1" FOREIGN KEY ("competitionId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brackets" ADD CONSTRAINT "FK_aa04e4738bcb8a8d39bf94e37a7" FOREIGN KEY ("player1Id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brackets" ADD CONSTRAINT "FK_faf988814fa486ab2c7aa6f76b4" FOREIGN KEY ("player2Id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_faf988814fa486ab2c7aa6f76b4"`);
        await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_aa04e4738bcb8a8d39bf94e37a7"`);
        await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_d2162c592c3bacb92ebece0b8a1"`);
        await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_3078be23cf1da9774c6c7e6f6d1"`);
        await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_bb1d00ae75e1c999de3ffa3f654"`);
        await queryRunner.query(`ALTER TABLE "competitions" DROP CONSTRAINT "FK_99b3bc76ddebdbc573b9b288ab2"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_b52e712987684be7290bdb8cbed"`);
        await queryRunner.query(`DROP TABLE "brackets"`);
        await queryRunner.query(`DROP TABLE "competitions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "players"`);
    }

}
