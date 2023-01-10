import { MigrationInterface, QueryRunner } from "typeorm";

export class DBinit1673363255481 implements MigrationInterface {
  name = "DBinit1673363255481";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "competitions" ADD "createUserId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "competitions" ADD CONSTRAINT "FK_d65c4b224335f65e0ea4a045a0c" FOREIGN KEY ("createUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "competitions" DROP CONSTRAINT "FK_d65c4b224335f65e0ea4a045a0c"`);
    await queryRunner.query(`ALTER TABLE "competitions" DROP COLUMN "createUserId"`);
  }
}
