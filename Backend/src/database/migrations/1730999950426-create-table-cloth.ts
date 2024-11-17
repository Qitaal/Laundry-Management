import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCloth1730999950426 implements MigrationInterface {
  name = 'CreateTableCloth1730999950426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "cloth" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "deleted_at" TIMESTAMP, 
            "is_active" boolean NOT NULL DEFAULT true, 
            "name" character varying(100) NOT NULL, 
            "tag" character varying(100) NOT NULL, 
            "image_path" character varying(200), 
            
            "user_id" uuid, CONSTRAINT "PK_ae1930fc444ac6ba2e92f7823e2" PRIMARY KEY ("id")
        )
    `);

    await queryRunner.query(`
        ALTER TABLE "cloth" 
        ADD CONSTRAINT "FK_918f3ee32a3c549de44570335a3" 
        FOREIGN KEY ("user_id") 
        REFERENCES "user"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "cloth" 
        DROP CONSTRAINT "FK_918f3ee32a3c549de44570335a3"
    `);
    await queryRunner.query(`DROP TABLE "cloth"`);
  }
}
