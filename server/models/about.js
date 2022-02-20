const mongoose = require('mongoose')
const Schema    = mongoose.Schema

const aboutSchema = new Schema({
    profession:{
        type:String,
        required:true
    }, 
    details:{
        type:String,
        required:true
    }, 
    
    portfolioImage:{
        type:String,
        required: true
    }, 
    
}, { timestamps: true })


const About = mongoose.model('About', aboutSchema)

module.exports = About