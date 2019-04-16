const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');


// Route for signup
router.post('/signup', (req, res) => {
    // See if the email is already in the db
    User.findOne({email: req.body.email}, (err, user) => { //findOne asynchronous so needs callback
        // if yes, return an error
        if (user) {
            res.json({type: 'error', message: 'Email already exists'})
        } else {
            // if no, create the user in the db
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            user.save( (err, user) => { //save is  asynchronous so needs callback
                if (err) {
                    res.json({type: 'error', message: 'Database error creating user'})
                } else {
                    // sign a token (this is the login step)
                    var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                        expiresIn: "1d" //or you can write 60 * 60 * 24 , seconds minutes hours, in this case a day 
                    });
                    // return the token
                    res.status(200).json({type: 'success', user: user.toObject(), token})
                }
            })

        }
    })
});


// Route for login
router.post('/login', (req, res) => {
    // Find user in db
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            // if no user, return error
            res.json({type: 'error', message: 'Account not found'})//made up token we're sending back
        } else { 
            // if user, check authentication
            if (user.authenticated(req.body.password) ) {
                // if authenticated, sign a token (login)
                var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                    expiresIn: "1d"
                })
                // return the token
                res.json({type: 'success', user: user.toObject(), token})
            } else {
                res.json({type: 'error', message: 'Authentication Failure'})
            }
        }
    })
})


// Route for token validation
router.post('/me/from/token', (req, res) => {
    // Make sure they sent us a token to check
    let token = req.body.token;
    if (!token) {
        // If no token, we can't do a verification, return error 
        res.json({type: 'error', message: 'You must pass a valid token!'});
    } else {
        // If token, verify it, we call our jwt library. 1st param, jwt verify take the token, 2nd the secret, 3rd if err, blah blah if user, get payload
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // If invalid, return an error
                res.json({type: 'error', message: 'Invalid token. Please log in again.'});
            } else {
                // If token is valid...
                //   Look up the user in the db
                User.findById(user._id, (err, user) => {
                    if (err) {
                        //   If user doesn't exist, return an error
                        res.json({type: 'error', message: 'Database error during validation.'})
                    } else {
                        //   If user exists, send user and token back to 
                        res.json({type: 'success', user: user.toObject(), token});
                    }
                })
            }
        })
    }
});



module.exports = router;