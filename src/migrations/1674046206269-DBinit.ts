import { MigrationInterface, QueryRunner } from "typeorm";

export class DBinit1674046206269 implements MigrationInterface {
    name = 'DBinit1674046206269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "inGame"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" ADD "inGame" boolean NOT NULL DEFAULT true`);
    }

}
