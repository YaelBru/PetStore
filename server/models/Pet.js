const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pet = new Schema(
  {
    name: {
      type: String
    },
    age: {
      type: String
    },
    description: {
      type: String
    },
    category: {
      type: String
    },
    image: {
      type: String
    }
  },
  {
    collection: "Pets For Adoption",
  }
);

module.exports = mongoose.model("Pet", Pet);
