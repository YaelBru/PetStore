const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: {
      type: String,
      unique: true
    },
    fullName: {
      type: String
    },
    password: {
      type: String
    },
    orders: {
      type: []
    }
  },
  {
    collection: "Users"
  }
);

module.exports = mongoose.model("User", User);
