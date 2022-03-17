const express = require('express')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 24 * 60 * 60 // Time in seconds : h * m * s
    })
}

const router = express.Router()

const User = require('../models/user')

router.post('/signin', async (req, res)=>{
    try{

        const { user, password, name} = req.body

        if(await User.findOne({ user })){
            return res.status(400).send({ error: 'User name already exists'})
        }
    
        const newUser = await User.create({user, password, name})
        newUser.password = undefined
    
        res.send({token: generateToken({id: newUser.id })})

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Registration failed' })
    }
})

router.post('/login', async (req, res) => {
    try{
        const { user, password} = req.body

        const loginUser = await User.findOne({ user })

        if(!loginUser){
            return res.status(400).send({ error: 'User not found' })
        }

        if(!await bcrypt.compare(password, loginUser.password)){
            return res.status(400).send({ error: 'Invalid password'})
        }
    
        user.password = undefined
    
        res.send({ loginUser, token: generateToken({ id: loginUser.id }) })


    }catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Login failed' })

    }
})
module.exports = app => app.use('/auth', router)