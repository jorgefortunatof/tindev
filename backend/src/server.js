//IMPORTANDO O EXPRESS PARA FAZER O SERVIDOR
const express = require('express')
//IMPORTANDO MONGOOSE --> SERVER PARA USARMOS SOMENTE JS SEM LINGUAGEM DE BANCO DE DADOS
const mongoose = require('mongoose')
//IMPORTANDO O CORS
const cors = require('cors')
//PUXA VARIAVEL CRIADA EM ROUTES.JS
const routes = require('./routes')
//CHAMANDO FUNCÇÃO EXPRESS
const server = express()



//CONNECTAR COM O BANCO DE DADOS
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-rzpdi.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

//MOSTRAR PARA O EXPRESS QUE ESTAMOS USANDO JSON
server.use(express.json())

//DEIXA PRONTA PARA O REACT PODER ACESSAR
server.use(cors())

//USA ROTAS CRIADAS EM ROUTES.JS
server.use(routes)

//DEFINE A PORTA DO SERVIDOR
server.listen(3333)


//NO TERMINAL=================================
//node src/server.js --> para rodar o servidor (INICIA O SERVIDOR MANUALMENTE)
//============================================
// crtl + c ==> encerra servidor

//INICIAR SERVER PELO NODEMON PARA QUE ALTERAÇÕES APARECEM INSTANTANIAMENTE 
//nodemon src/server.js
