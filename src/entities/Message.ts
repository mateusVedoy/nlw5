import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

import { v4 as uuid } from "uuid";

//importa entidade User
import { User } from "./User";

@Entity("messages")
class Message {

    @PrimaryColumn({name:"id"})
    id: string;

    @Column({name:"admin_id"})
    admin_id: string;

    //indica com qual coluna da tabela messages será o join
    @JoinColumn({name:"user_id"})
    //relacionamento de muitas messages para um user
    @ManyToOne(() => User)
    //define campo user como sendo do tipo User
    user: User;

    @Column({name:"user_id"})
    user_id: string;

    @Column({name:"text"})
    text: string;

    @CreateDateColumn({name:"created_at"})
    created_at: Date;

    constructor(){

        if(!this.id){

            this.id = uuid();
        }
    }
}

export { Message };