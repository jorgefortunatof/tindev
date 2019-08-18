const Dev = require('../models/dev')

module.exports = {
    async store(req, res){

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

        if (targetDev.likes.includes(loggedDev._id)){
            console.log('MATCH')
        }

        //ADICONA O ID DE QUEM VC DEU LIKE
        loggedDev.likes.push(targetDev._id)
        //SALVA NO BANCO  
        await loggedDev.save()

        return res.json({ ok: true})
    }
}