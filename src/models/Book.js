const mongoose = require("mongoose");

const bookSchema = {
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;