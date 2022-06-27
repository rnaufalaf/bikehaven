const orderRoute = require("express").Router();
const OrderController = require("../controllers/OrderController");
const authentication = require("../middlewares/auth");

orderRoute.get("/all", OrderController.getAllOrders); //just for admin
orderRoute.get("/", authentication, OrderController.orderByUserId);
orderRoute.post("/checkout", authentication, OrderController.create);
orderRoute.put("/payment", authentication, OrderController.updatePayment);
orderRoute.put("/cancel", authentication, OrderController.cancel);
orderRoute.get("/unpaid", authentication, OrderController.orderUnpaid);

module.exports = orderRoute;
