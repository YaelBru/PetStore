const User = require("../models/User");
const Order = require("../models/Order");
const jwtMiddleware = require("../middleware/jwt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

class AuthController {
  static async login(req, res, next) {
    try {
      let email = req.body.email.trim();
      let password = req.body.password.trim();
      let result = await User.findOne({ email: email });

      if (!result) {
        res.status(401).json({
          type: "login",
          message: "Email or password incorrect"
        });
      } else {
        if (result.password === password) {
          let token = jwt.sign({ email: result.email }, config.secret, {expiresIn: "24h"});
          res.status(200).json({
            success: true,
            token: token,
            user: {
              userId: result._id,
              fullName: result.fullName,
              email: result.email,
              orders: result.orders
            },
          });
        } else {
          res.status(409).json({
            type: "login",
            message: "Email or password incorrect"
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      let fullName = req.body.fullName.trim();
      let email = req.body.email.trim();
      let password = req.body.password.trim();
      let result = await User.findOne({email: email});

      if (!result) {
        User.create({
            fullName: fullName,
            email: email,
            password: password,
            orders: []
          },(error, data) => {
            if (error) {
              next(error);
            } else {
              let token = jwt.sign({email: data.email}, config.secret, {expiresIn: "24h"});
              res.json({
                success: true,
                token: token,
                user: {
                  userId: data._id,
                  fullName: data.fullName,
                  email: data.email,
                  orders: data.orders
                }
              });
            }
          }
        );
      } else {
        res.status(409).json({
          type: "register",
          message: "User already exists"
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      let userId = req.query.userId;
      let result = await User.findOne({_id: userId});
      let orders = await Order.find({userId: userId});

      if (!result) {
        res.status(401).json({
          success: false,
          message: "User not found"
        });
      } else {
        res.status(200).json({
          success: true,
          user: {
            userId: result._id,
            fullName: result.fullName,
            email: result.email,
            orders: orders
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
