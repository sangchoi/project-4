const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const mongoose = require('mongoose');

// GET user with cart and its items
router.get('/:uid/cart', (req, res) => {
    User.findById(req.params.uid)
    .populate({path: 'cart', match: {closeDate: null}, populate: {path: 'cartItems', populate: {path: 'herb'}}})
    .exec((err, user) => {
        if(err) res.json({err})
        if (user.cart.length === 0) {
            let cart = new Cart({
                closeDate: null,
                user: user._id
            });
            cart.save((err, cart) => {
                user.cart.push(cart._id)
                user.save((err, user) => {
                    res.status(201).json(user.cart[0]);
                })
            });
        } else {
            res.json(user.cart[0])
        }
        // res.status(200).json(user.cart);
    })
})

// POST - adding a cart item to the cart
router.post('/:uid/cart/:cid', (req, res) => {
    let newCartItem = new CartItem({
        quantity: 1,
        herb: req.body.herbId
    }); 
    newCartItem.save((err, cartItem) => {
            User.findById(req.params.uid).populate({path: 'cart', match: {closeDate: null}}).exec((err, user) => {
                if (user.cart.length === 0) {
                    let cart = new Cart({
                        closeDate: null,
                        user: user._id
                    });
                    cart.cartItems.push(cartItem._id)
                    cart.save((err, cart) => {
                        user.cart.push(cart._id)
                        user.save((err, user) => {
                            res.status(200).json(cart)
                        })
                    });
                } else {
                    Cart.findById(req.params.cid, (err, cart) => {
                        cart.cartItems.push(cartItem._id)
                        cart.save((err, cart) => {
                            res.status(200).json(cart)
                        })
                    })
                }
                // res.status(200).json(user.cart);
            })
        // cart.cartItems.push(cartItem);
        // cart.save((err, cart) => {
        //     res.status(200).json(cart)
        // })
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

// DELETE items in user's cart
router.delete('/:uid/cart/:cid/cartitems/:id', (req, res) => {
    CartItem.findOneAndDelete({_id: req.params.id}, (err, quote) => {
        Cart.findById(req.params.cid, (err, cart) => {
            if (err) res.json({err})
            cart.cartItems.pull(req.params.id)
            cart.save((err,doc) => {
                User.findById(req.params.uid)
                .populate({path:'cart', populate: {path: 'cartItems', populate: {path: 'herb'}}})
                .exec((err, user) => {
                    res.json(user)
                })
            });
        });
    });
});




module.exports = router;