const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    user:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

const Sentence = mongoose.model('User', UserSchema)

module.exports = Sentence