const route = require("express").Router();

route.get("/", (req, res) => {
  res.status(200).json({ message: "Bike Haven" });
});

const userRoutes = require("./user");
route.use("/users", userRoutes);

const productRoutes = require("./product");
route.use("/products", productRoutes);

const shoppingCartRoutes = require("./shoppingCart");
route.use("/carts", shoppingCartRoutes);

const lineItemRoutes = require("./lineItem");
route.use("/lineItems", lineItemRoutes);

const orderRoutes = require("./order");
route.use("/orders", orderRoutes);

module.exports = route;
