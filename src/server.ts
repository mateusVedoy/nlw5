//importa o arquivo com configurações do http
import { http, port } from "./http";

//importa o arquivo completo de client.ts
import "./websocket/client";

//define uma porta de comunicação
//deixou de ser app.listen para ser http.listen
http.listen (3333, () => {

    console.log("Service is running at port "+port);
});

