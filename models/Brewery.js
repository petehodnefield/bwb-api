const { Schema, model } = require("mongoose");

const brewerySchema = new Schema(
  {
    name: {
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
    price: {
      type: String,
    },
    hours: {
      type: String,
    },
    optionsAvailable: {
      type: String,
    },
    rating: {
      type: String,
    },
    image: {
      type: String,
    },
    createdAt: {
        type:  Date,
        default: Date.now,
        get: timestamp => timestamp

      },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Brewery = model("Brewerey", brewerySchema);

module.exports = Brewery;
