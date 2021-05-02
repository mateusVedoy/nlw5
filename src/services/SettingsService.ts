//RESPONSÁVEL PELAS REGRA DE NEGOCIO COM O BANCO

import { getCustomRepository, Repository } from "typeorm";

import { SettingsRepository } from "../repositories/SettingsRepository";

import { Setting } from "../entities/Setting";

//cria interface para receber apenas as infos pertinentes para post
interface ISettingsCreate {

    chat:boolean,
    username: string
}

//classe responsável por realizar criacao de fato
class SettingsService {

     //cria constante que receberá o repositorio
    private settingsRepository : Repository<Setting>;

    constructor(){

        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    //metodo create assíncrono que recebe de parametro chat e username do tipo interface ISettingsCreate
    async create({ chat, username } : ISettingsCreate){

        //verifica se o usuario já está cadastrado
        //settingsRepository.findOne() retornará apenas 1 registro caso haja
        const userAlreadyExists = await this.settingsRepository.findOne({username});

        //se a constante contiver dado
        if(userAlreadyExists){

            //retorna um mensagem de erro para o usuário
            throw new Error("Usuário já cadastrado anteriormente");
        }

        //instancia settings para receber valores de chat e username da entidade Setting
        const settings = this.settingsRepository.create({
            chat,
            username
        });

        await this.settingsRepository.save(settings);

        return settings;
    }

    //busca configs de acordo com o usuario
    async findByUsername(username: string) {

        const settingsUser = await this.settingsRepository.findOne({ username });

        return settingsUser;
    }

    //atualiza settings
    async settingsUpdate(username: string, chat:boolean) {

        await this.settingsRepository.createQueryBuilder()      //createQueryBuilder é um método typeorm que contém diversas ações de banco
        .update(Setting)                                        //atualizat tabela Setting
        .set({ chat })                                          //a coluna chat
        .where("username = :username", { username })            //onde coluna tal tiver :valortal
        .execute();                                             //executa
    }
}

export { SettingsService };