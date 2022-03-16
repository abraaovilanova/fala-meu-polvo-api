const mongoose = require('../database')

const SentenceSchema = mongoose.Schema({
    text:{
        type: String,
        require: true
    },
    tag: {
        type: String,
        require: true
    },
    information:{
        type: String,
        require: false,
        default: ''
    },
    language:{
        type: String,
        require: true
    },
    font:{
        type: String,
        default:'fala-meu-polvo-app'
    }
})

const Sentence = mongoose.model('Sentence', SentenceSchema)

module.exports = Sentence