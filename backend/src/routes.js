//IMPORTANDO O EXPRESS PARA FAZER O SERVIDOR
const express = require('express')
//IMPORTA O CONTROLLER DO DEV
const DevController = require('./controllers/DevController')
//IMPORTA O CONTROLLER DO LIKE
const likeController = require('./controllers/LikeController')
//IMPORTA O CONTROLLER DO DESLIKE
const deslikeController = require('./controllers/DeslikeController')

const routes = express.Router()
/*
//SERVER PEGA REQUISIÇÃO E RESPOSTA PARA MANDAR PARA O BOWSER (MANDA PELA URL)
routes.get('/', (req, res) => {

    //REQ PEGA PARAMETROS QUE VOCÊ DA NA URL
    let nome = req.query.name
    let idade = req.query.idade

    //ENVIA MENSAGEM OU OBJETO AO SERVIDOR
    return res.json({'nome': nome, 'idade' : idade})
})

//POST --> PARA CADASTRAR INFORMAÇÕES POR EXEMPLO (JÁ QUE NAO APARECE NA URL
routes.post('/devs', (req, res) => {

    //REQUISIÇÕES POST VEM PELO REQ.BODY
    console.log(req.body)

    //RETORNAR UMA RES PARA O REQUEST ACABAR
    return res.json({ok: 'ok'})
})
*/

//INDEX USUARIOS
routes.get('/devs', DevController.index)
//FUNCAO DO CONTROLLER DO DEV
routes.post('/devs', DevController.store)

//CONTROLLER DOS LIKES E DESLIKES (:devId --> parametros
routes.post('/devs/:devId/likes', likeController.store)
routes.post('/devs/:devId/deslikes', deslikeController.store)




//EXPORTANDO UM ARQUIVO (EXPOR UMS INFORMSÇAO DE DENTRO DE UM ARQUIVO)
module.exports = routes