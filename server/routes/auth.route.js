const express = require("express");
const authRoute = express.Router();
const AuthController = require("../controllers/auth.controller");

authRoute.route("/login").post(AuthController.login);
authRoute.route("/register").post(AuthController.register);
authRoute.route("/user").get(AuthController.getUser);

module.exports = authRoute;
