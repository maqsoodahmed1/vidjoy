const Joi = require('joi')
const mongoose = require('mongoose')
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movie',new mongoose.Schema({


title:{
    type:String,
    required:true,
    trim:true,
    minlength:5,
    maxlength:255
},
genre:{
    type:genreSchema,
    required:true
},
numberInStock:{
    type:Number,
    required:true
},
dailyRentalRate:{
    type:Number,
    required:true
}




}));


validateMovie = (movie) =>{

const schema =  {
    title:Joi.string().min(5).max(50).required(),
    genre:Joi.string().min(3).required(),
    numberInStock:Joi.number().min(0).required(),
    dailyRentalRate:Joi.number().min(0).required()


}
return Joi.validate(movie,schema)

}

exports.Movie = Movie;
exports.validate = validateMovie 
