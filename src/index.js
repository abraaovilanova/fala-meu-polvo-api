const express = require('express')
const cors = require('cors');

const app = express()

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

require('./controllers/sentencesController')(app)
require('./controllers/authController')(app)

app.listen(process.env.PORT || 3001, ()=>{
    console.log('The server is running in port 3001')
})