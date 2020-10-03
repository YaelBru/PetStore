const express = require("express");
const orderRoute = express.Router();
const OrderController = require("../controllers/order.controller");

orderRoute.route("/submit").post(OrderController.submitOrder);

module.exports = orderRoute;
