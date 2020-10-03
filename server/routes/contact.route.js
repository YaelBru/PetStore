const express = require("express");
const contactRoute = express.Router();
const ContactController = require("../controllers/contact.controller");

contactRoute.route("/submit").post(ContactController.submit);

module.exports = contactRoute;
