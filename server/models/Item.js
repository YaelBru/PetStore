const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema(
  {
    itemId: {
      type: String
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    category: {
      type: String
    },
    subcategory: {
      type: String
    },
    brand: {
      type: String
    },
    price: {
      type: Number
    },
    image: {
      type: String
    }
  },
  {
    collection: "Items"
  }
);

module.exports = mongoose.model("Item", Item);
