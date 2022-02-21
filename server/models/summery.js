const mongoose = require('mongoose')
const Schema = mongoose.Schema

const summerySchema = new Schema({
    
    details:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    summery: {
        type: String,
        required: true
    }
    
}, {timestamp: true})

const Summery = mongoose.model('summery', summerySchema)

module.exports = Summery