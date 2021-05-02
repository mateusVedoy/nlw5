import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1619392644417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        //criando tabela de users
        await queryRunner.createTable(

            new Table({
                name:"users",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary: true
                    },
                    {
                        name:"email",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        //exclui a tabela users
        await queryRunner.dropTable("users");
    }

}
