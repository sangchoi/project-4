const express = require('express');
const router = express.Router();
const Ailment = require('../models/ailment');
const Herb = require('../models/herb');
const mongoose = require('mongoose');

// GET all ailments
router.get('/', (req, res) => {
    Ailment.find({}, (err, ailments) => {
        if (!err) {
            res.status(200).json(ailments);
        } else {
            res.status(500).json(err);
        }
    })
})

// GET one ailment with herbs
router.get('/:id', (req, res) => {
    Ailment.findById(req.params.id).populate('herbs').exec((err, ailment) => {
        if (!err) {
            res.status(200).json(ailment);
        } else {
            res.status(500).json(err);
        }
    })
})

module.exports = router;