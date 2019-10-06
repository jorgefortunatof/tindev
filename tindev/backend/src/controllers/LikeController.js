const Dev = require('../models/dev')

module.exports = {
    async store(req, res){

        console.log(req.connectedUsers, req.io)


        //PEGA O PARAMETRO (devId) DA URL
        const {devId} = req.params
        //PEGA INFORMAÇÕES DO HEADER (ID DO USUARIO LOGADO)
        const {user} = req.headers

        //PEGA DEV DO DATABASE E O USUARIO
        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        //VE SE ALVO DO LIKE EXISTE
        if (!targetDev){
            return res.status(400).json({erro: 'dev not exists'})
        }

        //MATCH EM TEMPO REAL USANDO WEBSOCKET (SOCKET.IO)
        if (targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[user] //ID DO SOCKET DO USUARIO LOGGADO
            const targetSocket = req.connectedUsers[devId] //ID DO SOCKET DO USUARIO QUE ESTA RECEBENDO LIKE


            //MANDA INFORMAÇÕES DE UM USER PARA O OUTRO ATRAVES DO (ID DO SOCKET)
            if (loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev)
            }
            if (targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev)
            }

            console.log('MATCH')
        }

        //ADICONA O ID DE QUEM VC DEU LIKE
        loggedDev.likes.push(targetDev._id)
        //SALVA NO BANCO  
        await loggedDev.save()

        return res.json({ ok: true})
    }
}