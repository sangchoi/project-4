const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const herbSchema = new Schema({
    name: String,
    description: String,
    cost: Number,
    image: String
})

module.exports = mongoose.model('Herb', herbSchema);