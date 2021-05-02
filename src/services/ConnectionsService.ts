import { getCustomRepository, Repository } from "typeorm";

import { Connection } from "../entities/Connection";

import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionsCreate {
    
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
};

class ConnectionsService {

    private connectionsRepository: Repository<Connection>;

    constructor(){

        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }

    async create({ socket_id, user_id, admin_id, id } : IConnectionsCreate){

        const connections = this.connectionsRepository.create({
            admin_id,
            user_id,
            socket_id,
            id
        });

        await this.connectionsRepository.save(connections);

        return connections;
    };

    //procura a partir de certo id se há conexão criada para o usuario do id
    async findByUserId(id: string){

        const connectionExists = await this.connectionsRepository.findOne({id});

        return connectionExists;
    }
};

export { ConnectionsService };

