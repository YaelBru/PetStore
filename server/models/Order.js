const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    userId: {
      type: String
    },
    fullName: {
      type: String,
      required: true
    },
    mobile: {
      type: String
    },
    email: {
      type: String
    },
    shippingAddress: {
      type: String
    },
    orderNotes: {
      type: String
    },
    paymentType: {
      type: String
    },
    orderItems: {
      type: []
    },
    itemsTotalPrice: {
      type: Number
    },
    itemsTotalQuantity: {
      type: Number
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "orders"
  }
);

module.exports = mongoose.model("Order", Order);
