//REPONSAVEL POR PEGAR AS INFOS VINDAS DO CLIENTE

//importa do express a tipagem do request e response
import { Request, Response } from "express";

//importa classe SettingsService
import { SettingsService } from "../services/SettingsService";

//classe controladora das açoes na entidade Setting
//controller apenas pega as infos da rota, transfere para outra classe executar e retorna para a rota a info da ação
class SettingsController{

     //instancia objeto da classe
     /*private settingsService = null;

     constructor(){

          this.settingsService = new SettingsService();
     }*/

     //Promise<Response> indica que a funcao precisa retornar um response obrigtoriamente
     async create(request:Request, response:Response): Promise<Response>{
          
          //recebe chat e username da request
          const { chat, username } = request.body;

          const settingsService = new SettingsService();

          try{
               //chama o objeto passando o metodo create para salvar as infos no banco
               const settings = await settingsService.create({ chat, username });

               return response.json(settings);

          }catch(err){ //caso haja algum erro durante a tentiva de salvamento

               return response.status(400).json({

                    message: err.message    //retorna a mensagem do erro
               })
          }
     }

     //recebera da rota o user logado para verificar suas configs
     async findByUsername(request: Request, response: Response): Promise<Response> {

          const { username } = request.params;

          const settingsService = new SettingsService();

          const settingsUser = await settingsService.findByUsername(username);

          return response.json(settingsUser);
     }

     //recebe da rota info do chat e user da url
     async settingsUpdate(request: Request, response: Response): Promise<Response>{

          const { username } = request.params;
          const { chat } = request.body;

          const settingsService = new SettingsService();

          const settingsUpdate = await settingsService.settingsUpdate(username, chat);

          return response.json(settingsUpdate);
     }
}

export { SettingsController };