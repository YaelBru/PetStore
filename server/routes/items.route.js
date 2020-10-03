const express = require("express");
const itemsRoute = express.Router();
const ItemsController = require("../controllers/items.controller");

itemsRoute.route("/").get(ItemsController.getItemsList);

module.exports = itemsRoute;
