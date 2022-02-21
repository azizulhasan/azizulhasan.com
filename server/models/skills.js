const mongoose = require('mongoose')
const Schema = mongoose.Schema

const skillSchema = new Schema({
    details:{
        type: String,
        required: true
    },
    skills:{
        type: Array,
        required: true
    }
}, {timestamp: true})

const Skills = mongoose.model('Skills', skillSchema)

module.exports = Skills