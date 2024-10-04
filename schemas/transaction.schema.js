const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  book_issue_date: {
    type: Date,
    default: null,
  },
  book_return_date: {
    type: Date,
    default: null,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  book_id: {
    type: Schema.Types.ObjectId,
    ref: "book",
    default: null,
  },
  revenue_generated: {
    type: Number,
    default: 0,
  },
});

const transaction = model("transaction", transactionSchema);

module.exports = transaction;
