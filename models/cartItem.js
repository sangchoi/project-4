const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    herb: {type: Schema.Types.ObjectId, ref: 'Herb'},
    quantity: Number
})

module.exports = mongoose.model('CartItem', cartItemSchema);