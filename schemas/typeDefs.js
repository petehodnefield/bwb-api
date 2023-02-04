const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    bio: String
    posts: [Post]
    friends: [User]
  }

  type Post {
    _id: ID
    title: String!
    description: String!
    location: String!
    image: String
    reactions: [Reaction]
    createdAt: String

  }

  type Reaction {
    _id: ID
    reactionBody: Boolean
    createdAt: String
    username: String
  }

  type Brewery {
    _id: ID
    name: String
    description: String
    location: String
    price: String
    hours: String
    optionsAvailable: String
    rating: String
    image: String
    createdAt: String
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User

    posts(username: String): [Post]
    post(_id: ID!): Post

    breweries: [Brewery]
    brewery(_id: ID!): Brewery
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
    updateUser(bio: String!, _id: ID!): User
    deleteUser(_id: ID!): User

    addFriend(_id: ID!, friendId: ID!): User
    removeFriend(_id: ID!, friendId: ID!): User

    addReaction(postId: ID!, reactionBody: Boolean!, username: String!): Post
    removeReaction(postId: ID!, reactionId: ID!): Post


    addPost(user_id: ID! title: String!, description: String!, location: String!, image: String!): Post
    updatePost(_id: ID!, title: String, description: String, location: String): Post
    deletePost(_id: ID!): Post



    addBrewery(name: String!, description: String!, location: String!, 
      price: String, hours: String, optionsAvailable: String, rating: String): Brewery
    updateBrewery(_id: ID!, name: String!, description: String!, location: String!, price: String, hours: String, optionsAvailable: String, rating: String, image: String): Brewery
    deleteBrewery(_id: ID!): Brewery

  }


`;

module.exports = typeDefs;