const db = require('../config/connection')
const {User, Brewery, Post} = require('../models')
const breweryData = require('./data/brewery-data')
const postData = require('./data/post-data')
const userData = require('./data/user-data')

const seedDB = async () => {
    await User.deleteMany()
    await Post.deleteMany()
    await Brewery.deleteMany()

    const createBreweries = await Brewery.create(breweryData)
    const createUsers = await User.create(userData)

    const createPosts = await Post.create(postData)

    // Match a post to a user
    const matchPostToUser = async (postId) => {
        const randomUserIndex = Math.floor(Math.random() * createUsers.length)

        const updateUser = await User.findOneAndUpdate(
            {_id: createUsers[randomUserIndex].id},
            {$push: {posts: postId}},
            {new: true}
        )
    }
    // Loop through every post and update a user's posts
    for(let i = 0; i < createPosts.length; i++) {
        console.log()
        matchPostToUser(createPosts[i].id)
    }
   
    console.log('Data seeded!')
}



module.exports = seedDB;
