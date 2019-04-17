const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const herbSchema = new Schema({
    name: String,
    description: String,
    cost: Number,
    image: String,
    ailment: [{type: Schema.Types.ObjectId, ref: 'Ailment'}]
})

module.exports = mongoose.model('Herb', herbSchema);