const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema(
  {
    name: {
      type: String
    },
    mobile: {
      type: String
    },
    email: {
      type: String
    },
    messageContent: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "messages"
  }
);

module.exports = mongoose.model("Message", Message);
