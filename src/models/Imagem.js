const {Schema, model} = require('mongoose')

const imagemSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    imagemURL: {
        type: String,
        required: true
    },
    data:{
        type: Date,
        default: Date.now
    }
})

module.exports = model('Imagem2', imagemSchema)