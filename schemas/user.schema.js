const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  user_name: {
    type: String,
    unique: true,
    required: true,
  },
});

const user = model("user", userSchema);

module.exports = user;
