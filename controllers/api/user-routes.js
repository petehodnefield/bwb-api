const router = require('express').Router();
const { User, Posts } = require('../../models');
const Friend = require('../../models/Friend');

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Posts,
                attributes: ['id', 'title', 'description'],
          },
          {
            model: Friend,
            attributes: ['id', 'username'],
          }
        ]
    })
    .then(dbUserData => {
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

// Get user by id
router.get('/:id', (req, res) => {
    User.findOne({
        where: {id: req.params.id},
        attributes: { exclude: ['password'] },
        include: 
        [
            {
                model: Posts,
                attributes: ['id', 'title', 'description'],
          },
          {
            model: Friend,
            attributes: ['id', 'username'],
          }
        ]
        } )
    .then(dbUserData => {
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

// Create User
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

// Update user
router.put('/:id', (req, res) => {
    User.update(
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }, 
        {
            where: {id: req.params.id}
        })
    .then(dbUserData => {
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

// Delete user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

module.exports = router