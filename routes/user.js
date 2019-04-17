const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const mongoose = require('mongoose');

// GET user with cart
router.get('/:uid/cart', (req, res) => {
    User.findById(req.params.uid).populate('cart').exec((err, user) => {
        res.status(200).json(user.cart);
    })
})


// UPDATE items in user's cart
router.put('/:uid/cart/:cid/cartitems/:id', (req, res) => {
    CartItem.findByIdAndUpdate(req.params.id,{
        $set: {quantity: req.body.quantity}
    },{new: true}, (err, cartItem) => {
        Cart.findById(req.params.cid, (err, cart) => {
            if (err) {
                res.status(500).json({err})
            } else {
                res.status(200).json(cart)
            }
        })
    })
    
})




module.exports = router;