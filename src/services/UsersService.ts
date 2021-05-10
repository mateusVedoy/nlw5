import { getCustomRepository, Repository } from "typeorm";

import { UsersRepository } from "../repositories/UsersRepository";

import { User } from "../entities/User"

//não precisa interface, pois há apenas um campo para ser passado para o create

class UsersService {

    private usersRepository : Repository<User>;

    constructor(){
        
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    //lista todos usuarios cadastrados
    async allUsers(){

        const allUsers = await this.usersRepository.find();

        return allUsers;
    }

    //busca user pelo email recuperado
    async findByEmail(email: string){

        const userExists = await this.usersRepository.findOne({email});

       return userExists;
        
    }

    async create(email : string){

        let issetUser = await this.findByEmail(email);

        if(issetUser){

            return issetUser;
        }

        const users = this.usersRepository.create({email});

        await this.usersRepository.save(users);

        return users;
    }
}

export { UsersService };