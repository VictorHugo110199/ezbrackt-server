import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673471766324 implements MigrationInterface {
  name = "default1673471766324";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_a725d92eae74883bd09aab2b750"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_890653d707c4666ac81b92ea30f"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP COLUMN "rodadaAtual"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP COLUMN "rodadaChave"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "UQ_a725d92eae74883bd09aab2b750"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP COLUMN "jogador1Id"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "UQ_890653d707c4666ac81b92ea30f"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP COLUMN "jogador2Id"`);
    await queryRunner.query(`ALTER TABLE "brackets" ADD "currentRound" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "brackets" ADD "keyRound" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "brackets" ADD "player1Id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "UQ_aa04e4738bcb8a8d39bf94e37a7" UNIQUE ("player1Id")`
    );
    await queryRunner.query(`ALTER TABLE "brackets" ADD "player2Id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "UQ_faf988814fa486ab2c7aa6f76b4" UNIQUE ("player2Id")`
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
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "UQ_faf988814fa486ab2c7aa6f76b4"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP COLUMN "player2Id"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "UQ_aa04e4738bcb8a8d39bf94e37a7"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP COLUMN "player1Id"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP COLUMN "keyRound"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP COLUMN "currentRound"`);
    await queryRunner.query(`ALTER TABLE "brackets" ADD "jogador2Id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "UQ_890653d707c4666ac81b92ea30f" UNIQUE ("jogador2Id")`
    );
    await queryRunner.query(`ALTER TABLE "brackets" ADD "jogador1Id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "UQ_a725d92eae74883bd09aab2b750" UNIQUE ("jogador1Id")`
    );
    await queryRunner.query(`ALTER TABLE "brackets" ADD "rodadaChave" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "brackets" ADD "rodadaAtual" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_890653d707c4666ac81b92ea30f" FOREIGN KEY ("jogador2Id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_a725d92eae74883bd09aab2b750" FOREIGN KEY ("jogador1Id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
