const express = require("express");
const adoptionRoute = express.Router();
const AdoptionController = require("../controllers/adoption.controller");

adoptionRoute.route("/").get(AdoptionController.getAdoptionList);

module.exports = adoptionRoute;
