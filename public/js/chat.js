//gera evento ao clicar no botão iniciar chat
document.querySelector("#start_chat").addEventListener("click", (event) => {
    
    //atribui o objeto io ao socket
    const socket = io();

    //recupera o modal primario de suporte
    const chat_help = document.getElementById("chat_help");

    //esconde o modal primario de suporte
    chat_help.style.display = "none";

    //recupera o modal oculto de chat
    const chat_in_support = document.getElementById("chat_in_support");
    
    //revela o modal antes oculto de chat
    chat_in_support.style.display = "block";

    //recupera o email cadastrado
    const email = document.getElementById("email").value;
    
    //recupera a mensagem passada
    const text = document.getElementById("txt_help").value;

    //agrupa eventos socket
    socket.on("connect", () => {

        //passa os campos recuperados para params
        const params = { email, text };

        //emite evento
        //emit("nome_funcao", parametros, callback)
        socket.emit("client_first_access", params, (call, err) => {

            //notifica de erro caso haja ou envia callback se existir
           (err) ? console.log(err) : console.log(call);

        });
    });
});
