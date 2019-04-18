const express = require('express');
const router = express.Router();
const Ailment = require('../models/ailment');
const Herb = require('../models/herb');
const mongoose = require('mongoose');

// GET all ailments
router.get('/', (req, res) => {
    Ailment.find({}).populate('herbs').exec( (err, ailments) => {
        if (!err) {
            res.status(200).json(ailments);
        } else {
            res.status(500).json(err);
        }
    })
})

// GET one ailment with herbs
router.get('/:aid/herbs', (req, res) => {
    Ailment.findById(req.params.aid).populate('herbs').exec((err, ailment) => {
        if (!err) {
            res.status(200).json(ailment);
        } else {
            res.status(500).json(err);
        }
    })
})

// POST - Creates an ailment
router.post('/', (req, res) => {
    let ailment = new Ailment({
        name: req.body.name
    });
    ailment.save((err, doc) => {
        res.status(201).json(doc);
    });
})

// POST - Creates a new herb for that ailment
router.post('/:aid/herbs', (req, res) => {
    Ailment.findById(req.params.aid, (err, ailment) => {
        let newHerb = new Herb({
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            image: req.body.image
        });
        newHerb.save((err, herb) => {
            ailment.herbs.push(herb);
            ailment.save((err, ailment) => {
                res.status(200).json(ailment)
            })
        })
    })
} )

module.exports = router;