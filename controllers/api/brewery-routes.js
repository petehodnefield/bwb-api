const router = require('express').Router();
const { Brewery } = require('../../models');

// Create Brewery
router.post('/', (req, res) => {
    Brewery.create({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        price: req.body.price,
        taps: req.body.taps,
        hours: req.body.hours,
        optionsAvailable: req.body.optionsAvailable,
        rating: req.body.rating,
        image: req.body.image,
    })
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// Get all brewery
router.get('/', (req, res) => {
    Brewery.findAll({})
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// Get brewery by ID
router.get('/:id', (req, res) => {
    Brewery.findOne({where: {id: req.params.id}})
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// Update brewery
router.put('/:id', (req, res) => {
    Brewery.update({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        price: req.body.price,
        taps: req.body.taps,
        hours: req.body.hours,
        optionsAvailable: req.body.optionsAvailable,
        rating: req.body.rating,
        image: req.body.image,    }, 
    {
        where: {id: req.params.id}
    })
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// Delete brewery
router.delete('/:id', (req, res) => {
    Brewery.destroy({where: {id: req.params.id}})
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router