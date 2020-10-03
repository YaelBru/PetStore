let Item = require("../models/Item");

class ItemsController {
  static async getItemsList(req, res, next) {
    try {
      let searchQuery = req.query.searchQuery;

      if (searchQuery) {
        return Item.find({
          name: {
            $regex: searchQuery,
            $options: "i"
          }
        }, (error, data) => (error ? next(error) : res.status(200).json(data)));
      } else {
        return Item.find((error, data) => error ? next(error) : res.status(200).json(data));
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ItemsController;
