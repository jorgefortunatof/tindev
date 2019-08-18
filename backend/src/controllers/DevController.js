//IMPORTANDO O AXIOS
const axios = require('axios')
//IMPORTA DEV DE CONTROLLERS PARA PODERMOS CADASTRAR NO BANCO DE DADOS
const Dev = require('../models/dev')


//METODOS DO CONTROLLER DENTRO DE UM OBJETO
module.exports = {
    async store(req, res){
        
        //PEGA O USERNAME MANDADO PELO INSOMNIA (REQUISIÇÃO)
        const {username} = req.body

        //VE SE O USUARIO JA EXISTE NO BANDO DE DADOS
        const userExists = await Dev.findOne({user: username})
        if (userExists){
            return res.json(userExists)
        }

        //USANDO O PACOTE AXIOS PARA PODERMOS ACESSAR A API PUBLICA DO GITHUB
        const response = await axios.get(`https://api.github.com/users/${username}`)

        //AXIOS RETORNA AS INFORMAÇÕES NO RESPONSE.DATA
        const {name, bio, avatar_url: avatar} = response.data

        //PASSANDO INFORMAÇÕES PARA SALVAR NO BANCO
        const dev = await Dev.create({
            name: name,
            user: username,
            bio: bio,
            avatar: avatar
        })

        //RETORNA UMA RESPOSTA
        return res.json(dev)
    },
    async index(req, res){
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user)

        //USUARIOS QUE NÃO SAO O LOGGADO E QUE N TOMARAM LIKE OU DESLIKE
        const users = await Dev.find({
            //CONDICIONAL DO MONGODB
            //$NIN ==> NOT IN 
            //$NE ==> DIFERENTE
            $and: [
                {_id: { $ne: user}},
                {_id: { $nin: loggedDev.likes}},
                {_id: { $nin: loggedDev.deslikes}}
            ],

        })

        return res.json({users})
    }
}