const Message = require("../models/Message");

class ContactController {
  static async submit(req, res, next) {
    try {
      Message.create(req.body, (error, messageData) => {
        if (error) {
          res.status(409).json({
            success: false,
            message: "An Error Occurred"
          });
        } else {
          res.status(200).json({
            success: true,
            message: "We Got Your Message!"
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ContactController;
