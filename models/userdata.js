const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    verify_status: Number,
    secret_mail: String,
    user: String,
    pass: String,
    alphabet_key: String,
    numbly_key: String,
    date: String,
    //profile
    status: String,
    Name: String,
    DateOfBirth: String,
    phone: String,
    id_certificate: String
    
})

module.exports = mongoose.model('userdata', schema)