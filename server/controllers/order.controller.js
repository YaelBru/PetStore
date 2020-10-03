const Order = require("../models/Order");

class OrderController {
  static async submitOrder(req, res, next) {
    let orderRequest = req.body.orderDetails;

    let order = {
      userId: orderRequest.userId,
      fullName: orderRequest.billingDetails.fullName,
      mobile: orderRequest.billingDetails.mobile,
      email: orderRequest.billingDetails.email,
      shippingAddress: orderRequest.billingDetails.shippingAddress,
      orderNotes: orderRequest.billingDetails.orderNotes,
      paymentType: orderRequest.billingDetails.payment.paymentType,
      orderItems: orderRequest.orderDetails.orderItems,
      itemsTotalPrice: orderRequest.orderDetails.itemsTotalPrice,
      itemsTotalQuantity: orderRequest.orderDetails.itemsTotalQuantity,
    };

    try {
      Order.create(order, (error, data) => {
        if (error) {
          next(error);
          res.status(409).json({
            success: false,
            message: "Failed to place order"
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Order received",
            orderDetails: data
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
