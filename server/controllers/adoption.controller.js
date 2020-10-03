let Pet = require("../models/Pet");

class AdoptionController {
  static async getAdoptionList(req, res, next) {
    try {
      return Pet.find((error, data) => error ? next(error) : res.status(200).json(data));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdoptionController;
