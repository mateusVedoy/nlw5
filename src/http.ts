//importando express para aplicação
import express from "express";

import { createServer } from "http";                //importa metodo da do pacote http

import { Server, Socket } from "socket.io";         //importa metodos do pacteo socket.io

import { routes } from "./routes"                   //importa rotas

import path from "path";                            //importa a propriedade path do pacote path

//importa a conexao com o typeorm do arquivo index.ts
//por ser index, não precisa discriminar no import
import "./database/";

//instancia objeto express
const app = express();

//indica ao servidor o caminho para acessar pastas publicas
//__dirname, "..","public" significa sair um nivel do diretorio atual e entrar na public
app.use(express.static(path.join(__dirname, "..", "public")));

//define que os arquivos de view estarãp no diretorio descrito
app.set("views", path.join(__dirname,"..","public"));

//indiacr ao node para renderiza arquivos html com engine ejs
app.engine("html", require("ejs").renderFile);

//indica que a engine das views será html
app.set("view engine","html");

app.get("/pages/client", (request, response) => {

    return response.render("html/client.html");
});

//cria protocolo http
const http = createServer(app);

//criando protocolo websocket
const io = new Server(http);

//conexao com socket
/*io.on("connection", (socket: Socket) => {

    console.log("Conectado", socket.id);
});*/

app.use(express.json());

app.use(routes);

//define a oprta de acesso
const port = 3333;

export { http, io, port };