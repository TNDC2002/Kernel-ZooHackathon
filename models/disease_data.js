const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/diseases', { useNewUrlParser: true, useUnifiedTopology: true })
.catch((err)=>console.log(err))
const schema = new mongoose.Schema({
    specie: String,
    disease: String,
    location: [String],
    dangerous_tag: String,
    last_update: String,
})

module.exports = mongoose.model('disease',schema)