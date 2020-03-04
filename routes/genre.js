const {Genre,validate} =  require('../models/genre')
const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()

router.get('/', async(req,res) => {
    const Genres = await Genre.find()
    res.send(Genres)
})


router.post('/',async(req,res)=>{

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let genrename = new Genre ({name:req.body.name});
    genrename = await genrename.save()
    res.send(genrename)
})

router.put('/:id',async(req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    let Genres = await Genre.findById(req.params.id)    
     Genres.name = req.body.name;
     Genres.save()
     res.send(Genres)

})


router.delete('/:id',async(req,res)=>{
    let genres = await Genre.findByIdAndRemove(req.params.id)

    if(!genres) return res.status(404).send('id not found')
    res.send(`${req.params.id} removed seccessfully`)
})








module.exports = router;




