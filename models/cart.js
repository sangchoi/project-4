const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartItems: [{type: Schema.Types.ObjectId, ref: 'CartItem'}],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    closeDate: Date
})

module.exports = mongoose.model('Cart', cartSchema);