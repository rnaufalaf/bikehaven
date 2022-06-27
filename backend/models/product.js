"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User); //type admin
      Product.hasMany(models.ProductImage);
      Product.belongsToMany(models.Order, { through: models.LineItem });
      Product.belongsToMany(models.ShoppingCart, { through: models.LineItem });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Type must not be empty",
          },
        },
      },
      desc: DataTypes.TEXT,
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Price must not be empty",
          },
        },
      },
      stock: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      category: DataTypes.STRING,
      condition: DataTypes.STRING,
      totalSold: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      views: DataTypes.INTEGER,
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "User Id must not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
