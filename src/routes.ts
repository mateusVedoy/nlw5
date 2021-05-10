//RESPONSAVEL POR MAPEAR AS ROTAS DE TROCA DE DADOS ENTRE CLIENTE E SERVIDOR

//importa a classe rotas
import { Router } from "express";

//importa a pagina da classe SettingsController
import { SettingsController } from "./controller/SettingsController";

import { UsersController } from "./controller/UsersController";

import { MessagesController } from "./controller/MessagesController";

//instancia a classe router
const routes = Router();

//instancia objeto da classe SettingsController
const settingsController = new SettingsController();

const usersController = new UsersController();

const messagesController = new MessagesController();


//SETTINGS

//rota de Settings para inserir dados
routes.post("/settings", settingsController.create);                           //código da rota encontra-se dentro da classe SettingsController

routes.get("/settings/:username", settingsController.findByUsername);       //lista congis do user

routes.put("/settings/:username", settingsController.settingsUpdate);       //rota para atualizar settings do user


//USERS

routes.post("/users", usersController.create);                              //insere user

routes.get("/users", usersController.allUsers);                             //lista todos usuarios


//MESSAGES

routes.post("/messages", messagesController.create);                        //insere mensagem

routes.get("/messages/:id", messagesController.showByUser);                 //lista mensagem

//CONNECTION



export { routes };