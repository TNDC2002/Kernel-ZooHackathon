const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    specie: String,
    disease: String,
    location: [String],
    dangerous_tag: String,
    last_update: String,
})

module.exports = mongoose.model('disease',schema)