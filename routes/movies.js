const {Movie,validate} =  require('../models/movies')
const {Genre} = require('../models/genre')
const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()

router.get('/',async(req,res)=>{

    try {
          const movies = await Movie.find()
            res.send(movies)

    } catch (error) {
        
        res.send(error.message)
    }


})




router.post('/',async(req,res)=>{

try {
    // title:{
    // genre:{
    // numberInStock:{
    // dailyRentalRate:{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genre)
    if(!genre) return res.send('Genre not found by the given id')

    var movies = new Movie( {
        title:req.body.title,
        genre:{
            id:genre.id,
            name:genre.name    
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    }    )
    
    const movie = await movies.save()
    res.send(movie)


} catch (error) {
    res.send(error.message)
}


})




//update




router.put('/:id',async(req,res)=>{

    try {
       

        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
    
        const genre = await Genre.findById(req.body.genre)
        if(!genre) return res.send('Genre not found by the given id')
        
        var getmovie = await Movie.findById(req.params.id)
        getmovie.title = req.body.title
        getmovie.genre = {id:genre.id,
                           name:genre.name     }
        getmovie.numberInStock = req.body.numberInStock
        getmovie.dailyRentalRate = req.body.dailyRentalRate

        getmovie.save()
        res.send(getmovie)
    
    
    } catch (error) {
        res.send(error.message)
    }
    
    
    })
    

    router.delete('/:id',async(req,res)=>{
        const movie = await Movie.findByIdAndDelete(req.params.id)
        res.send(`The given id is successfully deleted ${req.params.id}`)
    })







module.exports = router;




