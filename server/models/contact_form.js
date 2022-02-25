const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactFormSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {timestamp: true})

const ContactForm = mongoose.model('ContactForm', contactFormSchema)

module.exports = ContactForm