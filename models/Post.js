const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      min: 8,
      max: 20,
    },
    location: {
      type: String,
      required: true,
      max: 30,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
