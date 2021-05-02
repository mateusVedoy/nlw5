//importa objeto contendo as funcções do servidor http e socket
import { io } from "../http";

//importa a página de service de conexões e de usuarios
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

interface IParams{
    text: string,
    email: string
}

//conexao com o socket do client
io.on("connect", (socket) => {

    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    //criação do evento de recuperar dados do primeiro acesso
    socket.on("client_first_access", async (params: IParams) => {

        //recupera o id do socket
        const socket_id = socket.id;

        //recupera os dados fonnecidos na tela de chat de primeiro acesso
        const { text, email } = params;

        //variavel que servirá para armazenar o valor de user_id
        let user_id = null;

        //verifica se o email passado é de um user já cadastrado
        const userExists = await usersService.findByEmail(email)

        //caso não haja cadastro para o email passado, criar
        if(!userExists){

            //criar usuario e vincula email
            const user = await usersService.create(email);

            //cria conexao e vincula ao usuario
            await connectionsService.create({
                socket_id,
                user_id:user.id
            });

            user_id = user.id;      //caso cadastre novo user
            
        }else{  //caso já haja user para o email recuperado

            //verifica se o há conexao para o usuario recuperado a partir do email 
            const connection = await connectionsService.findByUserId(userExists.id);

            //se não houver conexao para o user, criar
            if(!connection){

                await connectionsService.create({
                    socket_id,
                    user_id:userExists.id
                });

            }else{  //se já houver conexao para o user, atualizar socket_id

                connection.socket_id = socket_id;               //sobrescreverá o socket atual

                await connectionsService.create(connection);    //atualiza conexao com novo socket_id   
            }

            //salvar conexão com o id do usuario recuperado
            await connectionsService.create({
                socket_id,
                user_id:userExists.id
            });

            user_id = userExists.id;    //caso haja user cadastrado
        }

        //salvar primeira mensagem enviada pelo user na tabela messages
        await messagesService.create({
            text,
            user_id
        });
    });
});
