import { getCustomRepository, Repository } from "typeorm";

import { Message } from "../entities/Message";

import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {

    admin_id?: string,      //?: informa que o valor pode não ser informado
    text: string,
    user_id: string
}
class MessagesService {

    //cria atributo comum aos métodos da classe
    private messagesRepository: Repository<Message>;

    constructor(){
        
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({ admin_id, text, user_id } : IMessageCreate){

        const messages = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        });

        await this.messagesRepository.save(messages);

        return messages;
    };

    //traz as mensagens do usuario
    async listByUser(user_id:string){

        //busca na tabela messages por mensagens do usuario
        const list = await this.messagesRepository.find({ 
            where: {user_id},
            //trará todos os campos do cad do user do user_id da busca
            relations:["user"]  //user refere-se ao nome informado em Message.ts, linha 22
        });

        return list;

    }
}

export { MessagesService };