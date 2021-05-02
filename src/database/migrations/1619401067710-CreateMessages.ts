import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1619401067710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(

            new Table({
                name: "messages",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "admin_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "user_id",        //fk vinda da tabela users
                        type: "uuid"                   
                    },
                    {
                        name: "text",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys:[
                    {
                        name: "FK_user",                    //nome para esta relação entre as tabelas
                        referencedTableName: "users",       //tabela de origem
                        referencedColumnNames: ["id"],      //coluna de origem da tabela de origem
                        columnNames:["user_id"],            //coluna da tabela de destino
                        onDelete: "SET NULL",               //caso o id referenciado seja deletado, o id da relação será nulo
                        onUpdate: "SET NULL"                //caso o id referenciado seja modificado, o id da relação será nulo
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("messages");
    }

}
