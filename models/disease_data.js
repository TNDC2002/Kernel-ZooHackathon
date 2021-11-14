const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    specie: String,
    disease: String,
    location: [String],
    Risk_level: String,
    last_update: String,
    picture: String
})

module.exports = mongoose.model('disease',schema)