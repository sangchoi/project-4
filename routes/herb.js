const express = require('express');
const router = express.Router();
const Herb = require('../models/herb');
const Ailment = require('../models/ailment');
const mongoose = require('mongoose');

// GET all herbs
router.get('/', (req, res) => {
    Herb.find({}, (err, res) => {
        if (!err) {
            res.status(200).json(herbs);
        } else {
            res.status(500).json(err);
        }
    })
})



// GET one herb with ailments
router.get('/:id', (req, res) => {
    Herb.findById(req.params.id).populate('ailments').exec((err, herb) => {
        if (!err) {
            res.status(200).json(herb);
        } else {
            res.status(500).json(err);
        }
    })
})

// POST : add an herb to your cart
router.post('/:id', (req, res) => {
    let herb = new herb({
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        image: req.body.image,
        ailment: req.body.ailment
    });
    herb.save((err, doc) => {
        res.status(201).json(doc);
    })
})

module.exports = router;