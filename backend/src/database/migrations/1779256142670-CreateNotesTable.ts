import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotesTable1779256142670 implements MigrationInterface {
    name = 'CreateNotesTable1779256142670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notes" ("id" uuid NOT NULL, "site" character varying NOT NULL, "equipment" character varying NOT NULL, "variable" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "author" character varying NOT NULL, "message" text NOT NULL, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notes"`);
    }

}
