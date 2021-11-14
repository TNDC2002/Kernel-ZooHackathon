const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/datas', { useNewUrlParser: true, useUnifiedTopology: true })
.catch((err)=>console.log(err))
const schema = new mongoose.Schema({
    mail: String,
    mail_code: Number,
    mail_confirmation: String,
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

module.exports = mongoose.model('userdata',schema)