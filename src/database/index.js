require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING)
mongoose.Promise = global.Promise

module.exports = mongoose