import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673366918818 implements MigrationInterface {
  name = "default1673366918818";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "competitions" DROP CONSTRAINT "FK_d65c4b224335f65e0ea4a045a0c"`);
    await queryRunner.query(`ALTER TABLE "competitions" RENAME COLUMN "createUserId" TO "userIdId"`);
    await queryRunner.query(
      `ALTER TABLE "competitions" ADD CONSTRAINT "FK_55e6ef104f93e0a6a8c557d006d" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "competitions" DROP CONSTRAINT "FK_55e6ef104f93e0a6a8c557d006d"`);
    await queryRunner.query(`ALTER TABLE "competitions" RENAME COLUMN "userIdId" TO "createUserId"`);
    await queryRunner.query(
      `ALTER TABLE "competitions" ADD CONSTRAINT "FK_d65c4b224335f65e0ea4a045a0c" FOREIGN KEY ("createUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
