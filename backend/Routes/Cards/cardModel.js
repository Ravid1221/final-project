const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
  },
  image: {
    url: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1024,
    },
    alt: { type: String, required: true, minlength: 0, maxlength: 256 },
  },
  ingredients: {
    type: [String],
    required: true,
    minlength: 1,
    maxlength: 1024,
  },
  steps: {
    type: [String],
    required: true,
    minlength: 1,
    maxlength: 1024,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Card = mongoose.model("card", cardSchema);

exports.Card = Card;
