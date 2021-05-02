import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConnections1619571922015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(

            new Table({
                name: "connections",
                columns: [
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
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "socket_id",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );

        //outra forma de criar foreignkeys
        await queryRunner.createForeignKey(

            "connections",                          //tabela que receberá fk
            
            new TableForeignKey({

                name: "FK_connection_user",         //nome para a relação entre as tabelas
                referencedTableName: "users",       //tabela de origem
                referencedColumnNames: ["id"],      //colunas da tabela de origem que serão fk - somente serve pk da tabela origem
                columnNames: ["user_id"],           //coluna destino 
                onDelete: "SET NULL",               //caso o id referenciado seja deletado, o id da relação será nulo
                onUpdate: "SET NULL"                //caso o id referenciado seja modificado, o id da relação será nulo
            })
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        //exclui fk da tabela antes de exluir tabela
        //apenas se faz preciso por ter fk declarada fora da criação da tabela
        //passa a tabela a ser deletada fk e o nome relacional entre a pk e a fk
        await queryRunner.dropForeignKey("connections", "FK_connection_user");

        await queryRunner.dropTable("connections");
    }

}
