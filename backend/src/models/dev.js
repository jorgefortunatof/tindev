//IMPORTA SCHEMA E MODEL DE MONGOOSE
const {Schema, model} = require('mongoose')


//CRIA TABELA COM COLUNAS DOS DESENVOLVEDORES
const DevSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    deslikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    
},
{
    timestamps: true,
}
)


//EXPORTA O NOME E O MODELO
module.exports = model('Dev', DevSchema)