//IMPORTANDO O EXPRESS PARA FAZER O SERVIDOR
const express = require('express')
//IMPORTANDO MONGOOSE --> SERVER PARA USARMOS SOMENTE JS SEM LINGUAGEM DE BANCO DE DADOS
const mongoose = require('mongoose')
//IMPORTANDO O CORS
const cors = require('cors')

//PUXA VARIAVEL CRIADA EM ROUTES.JS
const routes = require('./routes')

//CHAMANDO FUNCÇÃO EXPRESS
const httpServer = express()
//JUNTA O EXPRESS COM O HTTP DO NODE
const server = require('http').Server(httpServer)
//PREPARA O SERVER PARA USAR SOCKET.IO
const io = require('socket.io')(server)


//ARMAZENA CHAVE-VALOR, NÃO É RECOMENDAVEL FAZER ISSO DESSA FORMA
//O CERTO É USAR UM DATABASE
const connectedUsers = {
}

//CONEXAO COM O SOCKET PELO FRONT
io.on('connection', socket => {
    const {user} = socket.handshake.query; //RECEBE O ID DO USUÁRIO
    connectedUsers[user] = socket.id; //RELACIONA O ID DO USER COM O ID DO SOCKET
})


//CONNECTAR COM O BANCO DE DADOS
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-rzpdi.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
})


//MIDLEWHARE -> TRATA REQUISICOES ANTES DE ELAS IREM PARA AS ROTAS
httpServer.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})


//DEIXA PRONTA PARA O REACT PODER ACESSAR
httpServer.use(cors())
//MOSTRAR PARA O EXPRESS QUE ESTAMOS USANDO JSON
httpServer.use(express.json())
//USA ROTAS CRIADAS EM ROUTES.JS
httpServer.use(routes)

//DEFINE A PORTA DO SERVIDOR
server.listen(4444)
