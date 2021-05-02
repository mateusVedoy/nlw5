import { Request, Response } from "express";

import { MessagesService } from "../services/MessagesService";

class MessagesController {

    async create(request:Request, response:Response): Promise<Response>{

        const { admin_id, user_id, text } = request.body;

        const messagesService = new MessagesService();

        try{

            const messages = await messagesService.create({
                admin_id,
                text,
                user_id
            });

            return response.json(messages);

        }catch(err){

            return response.status(400).json({

                message: err.message    //retorna a mensagem do erro
           })
        }
    }

     //recebe a lista de mensagens do usuario
     async showByUser(request:Request, response:Response): Promise<Response>{
            
        //recebe o id do usuario vindo dos params da rota
        const { id } = request.params;

        const messagesService = new MessagesService();

        const list = await messagesService.listByUser(id);

        return response.json(list);
    }
}

export { MessagesController };