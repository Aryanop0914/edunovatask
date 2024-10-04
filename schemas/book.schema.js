const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  book_name: {
    type: String,
    unique: true,
    required: true,
  },
  book_category: {
    type: String,
    required: true,
  },
  book_rent_per_day: {
    type: Number,
    required: true,
  },
});

const book = model("book", bookSchema);

module.exports = book;
