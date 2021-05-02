import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";

import { v4 as uuid } from "uuid";

import { User } from "./User";

@Entity("connections")
class Connection {

    @PrimaryColumn({name:"id"})
    id: string;

    @Column({name:"admin_id"})
    admin_id: string;

    @JoinColumn({name:"user_id"})
    @ManyToOne(() => User)
    user: User;

    @Column({name:"user_id"})
    user_id: string;

    @Column({name: "socket_id"})
    socket_id: string;

    @CreateDateColumn({name:"created_at"})
    created_at: Date;

    @UpdateDateColumn({name:"updated_at"})
    updated_at: Date;

    constructor(){

        if(!this.id){

            this.id = uuid();
        }
    }   
};

export { Connection };