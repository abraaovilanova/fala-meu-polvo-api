const express = require('express')
const { route } = require('express/lib/application')

const router = express.Router()
const Sentence = require('../models/sentence')

router.get('/:language', async (req,res)=>{

    try{
        const { language } = req.params
        const tags = await Sentence.find({language}).distinct('tag')
        
        if(language === 'english'){
            return res.send({message:'Hello World!', tags})
        }
    
        if(language === 'french'){
            return res.send({message:'Bonjour monde!', tags})
        }
    }catch(err){
        return res.status(400).send({ error: 'Error loading sentences tags'})
    }
})

router.get('/:language/:tag', async (req, res)=>{
    try{
        const {language, tag} = req.params
        const sentences = await Sentence.find({language, tag})
        return res.send({sentencesList: sentences})

    }catch(err){
        return res.status(400).send({ error: 'Error loading sentences'})
    }
})


router.post('/', async (req,res)=>{
    const {text, tag, information, language} = req.body

    await Sentence.create({text, tag, information, language})

    res.send("sentence added successfully")
})


module.exports = app => app.use('/sentences', router)