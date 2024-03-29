
import { Request, Response } from "express";

import { UsersService } from "../services/UsersService";

class UsersController {

    async create(request:Request, response:Response): Promise<Response>{

        const { email }  = request.body;

        const usersService = new UsersService();

        try{

            const users = await usersService.create(email);

            return response.json(users);

        }catch(err){

            return response.status(400).json({
                message: err.message
            });
        }
    }

    //traz todos usuarios
    async allUsers(request: Request, response: Response) :Promise<Response>{

        const usersService = new UsersService();

        const allUsers = await usersService.allUsers();

        return response.json(allUsers);
    }
}

export { UsersController };