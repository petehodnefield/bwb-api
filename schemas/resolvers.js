const { User, Thought, Post, Brewery } = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const Brewerey = require('../models/Brewery');
const {signToken} = require('../utils/auth')


const resolvers = {
  Query: {
    // Admin Query
    me: async(parent, args, context) => {
      if(context.user) {
        const userData = await User.findOne({_id: context.user._id})
        .select('-__v -password')
        .populate('posts')
        .populate('friends')
        return userData
      }
        
    },

    // User Queries
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('posts')
        .populate('friends');
    },

    user: async (parent, { id }) => {
      return User.findOne({ id })
        .select('-__v -password')
        .populate('friends')
        .populate('posts');
    },
    
    // Post Queries
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },

    post: async (parent, { _id }) => {
      return Post.findOne({ _id })
        .populate('reactions');
    },

    // Brewery Queries
    breweries: async () => {
      return Brewerey.find()
    },

    brewery: async (parent, {id}) => {
      return Brewerey.findOne({ id })
      .select('-__v -password')
    },
  },
  Mutation: {
    // User Mutations
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)
      return  {token, user}
    },

    updateUser: async (parent, args, context) => {
        const updatedUser = await User.findOneAndUpdate(
          {_id: args._id},
          {
            bio: args.bio
          },
        )
        return updatedUser
      },  

      deleteUser: async (parent, args, context) => {
        const deletedUser = await User.deleteOne({_id: args._id},)
        return "User deleted!"
      },

      login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        
        const token = signToken(user)
        return {token, user}
      },

      addFriend: async (parent, args) => {
        const updatedUser = await User.findOneAndUpdate(
          {_id: args._id},
          {$addToSet: {friends: args.friendId}},
          {new: true}
        ).populate('friends')
          const secondUser = await User.findOneAndUpdate(
            {_id: args.friendId},
            {$addToSet: {friends: args._id}},
            {new: true}
          ).populate('friends')

        return updatedUser, secondUser
    },

    removeFriend: async (parent, args) => {
        const updatedUser = await User.findOneAndUpdate(
          {_id: args._id},
          {$pull: {friends: args.friendId}},
          {new: true}
        ).populate('friends')
          const secondUser = await User.findOneAndUpdate(
            {_id: args.friendId},
            {$pull: {friends: args._id}},
            {new: true}
          ).populate('friends')

        return updatedUser, secondUser
    },

    // Reaction Mutation
    addReaction: async(parent, {username, reactionBody, postId}) => {
      const reaction = await Post.findOneAndUpdate(
        {_id: postId},
        {$push: {reactions: {reactionBody, username: username}}},
        {new: true}
      )
      return reaction
    },

    removeReaction: async (parent, { postId, reactionId}) => {
      const removedReaction = await Post.findOneAndUpdate(
        {_id: postId},
        {$pull: {reactions: {reactionId}}},
        {new: true}
      )
      return removedReaction 
    },


  // Post Mutations
    addPost: async (parent, args) => {
      const post = await Post.create(args)

      const updateUserPosts = User.findOneAndUpdate(          
          {_id: args.user_id},
          {$addToSet: {posts: post._id}},
          {new: true}
        )
      return  updateUserPosts
    },

    updatePost: async (parent, args) => {
      const updatedPost = await Post.findOneAndUpdate(
        {_id: args._id},
        {
          title: args.title,
          description: args.description,
          location: args.location
        },
      )
      return updatedPost
    },

    deletePost: async (parent, args, context) => {
      return Post.deleteOne({_id: args._id},)
    },

  // Brewery Mutations    
    addBrewery: async (parent, args) => {
      const brewery = await Brewerey.create(args)
      return  brewery
    },

    updateBrewery: async (parent, args, context) => {
        const updatedBrewery = await Brewery.findOneAndUpdate(
          {_id: args._id},
          {
            name: args.name,
            description: args.description,
            hours: args.hours,
            optionsAvailable: args.optionsAvailable,
            taps: args.taps,
            price: args.price,
            image: args.image,
            rating: args.rating
          },
        )
        return updatedBrewery
      },

      deleteBrewery: async (parent, args, context) => {
        const deletedBrewery = await Brewery.deleteOne({_id: args._id},)
        return "Brewery deleted!"
      },
   
    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });
    
    
    //   const correctPw = await user.isCorrectPassword(password);
    
    //   if (!correctPw) {
    //     throw new AuthenticationError('Incorrect credentials');
    //   }
      
     
    //   return  user
    // },

      
    
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // addReaction: async (parent, {thoughtId, reactionBody}, context) => {
    //   if(context.user) {
    //     const updatedThought = await Thought.findOneAndUpdate(
    //       {_id: thoughtId},
    //       {$push: {reactions: {reactionBody, username: context.user.username}}},
    //       {new: true, runValidators: true}
    //     )
    //     return updatedThought
    //   }
    //   throw new AuthenticationError('You need to be logged in!')
    // },
 
  }
};

module.exports = resolvers;