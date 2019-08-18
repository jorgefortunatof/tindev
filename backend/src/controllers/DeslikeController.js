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

        //VE SE ALVO DO DESLIKE EXISTE
        if (!targetDev){
            return res.status(400).json({erro: 'dev not exists'})
        }


        //ADICONA O ID DE QUEM VC DEU DESLIKE
        loggedDev.deslikes.push(targetDev._id)
        //SALVA NO BANCO  
        await loggedDev.save()

        return res.json({ ok: true})
    }
}