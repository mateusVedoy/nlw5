//PAGINA QUE RECEBE O OBJETO QUE SE RELACIONA COM A ENTIDADE

//importa de dentro de typeORM
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";

//importa uuid para poder gerar o id pelo projeto e não pelo banco
//v4 é uma das formas de gerar o código uuid 
import { v4 as uuid } from "uuid";
//indica que Setting é relacionada a entidade settings do banco
@Entity("settings")
//criando a classe Setting
class Setting {

    //indica que é pk
    @PrimaryColumn({name: "id"})
    id:string;

    //indica a qual coluna se relaciona
    @Column({name: "username"})
    username: string;

    //indica a qual coluna se relaciona
    @Column({name: "chat"})
    chat:boolean;

    //indica a qual coluna se relaciona
    @UpdateDateColumn({name: "updated_at"})
    updated_at:Date;

    //indica a qual coluna se relaciona
    @CreateDateColumn({name: "created_at"})
    created_at:Date

    constructor(){

        //verifica se o id passado já contem valor
        if(!this.id){

            this.id = uuid();
        }
    }
};

//exportando a classe Setting
export { Setting };