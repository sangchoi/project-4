const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ailmentSchema = new Schema({
    name: String,
    herbs: [{type: Schema.Types.ObjectId, ref: 'Herb'}]
})

module.exports = mongoose.model('Ailment', ailmentSchema);