const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartItems: [{type: Schema.Types.ObjectId, ref: 'cartItem'}],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Cart', cartSchema);