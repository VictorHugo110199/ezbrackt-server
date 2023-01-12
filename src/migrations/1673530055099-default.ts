import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673530055099 implements MigrationInterface {
  name = "default1673530055099";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_bb1d00ae75e1c999de3ffa3f654"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_3078be23cf1da9774c6c7e6f6d1"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_aa04e4738bcb8a8d39bf94e37a7"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_faf988814fa486ab2c7aa6f76b4"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "REL_bb1d00ae75e1c999de3ffa3f65"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "REL_3078be23cf1da9774c6c7e6f6d"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "REL_aa04e4738bcb8a8d39bf94e37a"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "REL_faf988814fa486ab2c7aa6f76b"`);
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_bb1d00ae75e1c999de3ffa3f654" FOREIGN KEY ("winnerId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_3078be23cf1da9774c6c7e6f6d1" FOREIGN KEY ("loserId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_3078be23cf1da9774c6c7e6f6d1"`);
    await queryRunner.query(`ALTER TABLE "brackets" DROP CONSTRAINT "FK_bb1d00ae75e1c999de3ffa3f654"`);
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "REL_faf988814fa486ab2c7aa6f76b" UNIQUE ("player2Id")`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "REL_aa04e4738bcb8a8d39bf94e37a" UNIQUE ("player1Id")`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "REL_3078be23cf1da9774c6c7e6f6d" UNIQUE ("loserId")`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "REL_bb1d00ae75e1c999de3ffa3f65" UNIQUE ("winnerId")`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_faf988814fa486ab2c7aa6f76b4" FOREIGN KEY ("player2Id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_aa04e4738bcb8a8d39bf94e37a7" FOREIGN KEY ("player1Id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_3078be23cf1da9774c6c7e6f6d1" FOREIGN KEY ("loserId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "brackets" ADD CONSTRAINT "FK_bb1d00ae75e1c999de3ffa3f654" FOREIGN KEY ("winnerId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
