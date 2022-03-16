const express = require('express')

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const { route } = require('express/lib/application')


const router = express.Router()

const User = require('../models/user')

router.post('/signin', async (req, res)=>{
    try{

        const { user, password, name} = req.body

        if(await User.findOne({ user })){
            return res.status(400).send({ error: 'User name already exists'})
        }
    
        await User.create({user, password, name})
    
        res.send('User create successifuly!')

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Registration failed' })
    }
})

module.exports = app => app.use('/auth', router)