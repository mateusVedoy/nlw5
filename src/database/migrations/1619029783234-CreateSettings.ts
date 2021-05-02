import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1619029783234 implements MigrationInterface {

    //executa migration
    public async up(queryRunner: QueryRunner): Promise<void> {
    
        //cria a tabela settings
        await queryRunner.createTable(
            new Table({
                 name:"settings",
                 columns:[
                     {
                        name:"id",
                        type:"uuid",     //identificador universal unico
                        isPrimary:true
                     },
                     {
                        name:"username",
                        type:"varchar"
                     },
                     {
                        name:"chat",
                        type:"boolean",
                        default:true
                     },
                     {
                        name:"updated_at",
                        type:"timestamp",
                        default:"now()"     //por padrão trará Data-hora corrente
                     },
                     {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                     }
                 ]
            })
        )
    };

    //retrocede o processo da migration
    public async down(queryRunner: QueryRunner): Promise<void> {

        //deleta a tabela settings
        await queryRunner.dropTable("settings");
    };

}
