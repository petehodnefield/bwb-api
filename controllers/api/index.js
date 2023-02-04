const router = require('express').Router();

const userRoutes = require('./user-routes')
router.use('/users', userRoutes)

const postRoutes = require('./post-routes')
router.use('/posts', postRoutes)

const friendRoutes = require('./friend-routes')
router.use('/friends', friendRoutes)

const breweryRoutes = require('./brewery-routes')
router.use('/breweries', breweryRoutes)

module.exports = router