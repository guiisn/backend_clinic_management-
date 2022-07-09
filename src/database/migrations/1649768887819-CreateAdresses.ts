import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAdresses1649768887819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "adresses",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            isGenerated: true,
          },
          {
            name: "street",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "number",
            type: "int",
            isNullable: false,
          },
          {
            name: "district",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("adresses");
  }
}
