const router = require('express').Router();
const { Posts } = require('../../models');

// Create post
router.post('/', (req, res) => {
    Posts.create({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        user_id: req.body.user_id
    })
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// Get all posts
router.get('/', (req, res) => {
    Posts.findAll({})
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// Get post by ID
router.get('/:id', (req, res) => {
    Posts.findOne({where: {id: req.params.id}})
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// Update post
router.put('/:id', (req, res) => {
    Posts.update({title: req.body.title, description: req.body.description}, {where: {id: req.params.id}})
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// Delete post
router.delete('/:id', (req, res) => {
    Posts.destroy({where: {id: req.params.id}})
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router