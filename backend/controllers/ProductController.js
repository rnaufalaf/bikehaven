const { Product, User, ProductImage } = require("../models");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [User, ProductImage],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
  //just for admin
  static async create(req, res, next) {
    try {
      const id = req.userData.id;
      const imagenames = req.files;
      const {
        name,
        desc,
        price,
        stock,
        weight,
        category,
        condition,
        totalSold,
        rating,
        views,
      } = req.body;

      const result = await Product.create({
        name,
        desc,
        price,
        stock,
        stock,
        weight,
        category,
        condition,
        totalSold,
        rating,
        views,
        UserId: id,
      });

      console.log(imagenames);

      imagenames.forEach(async (imagename, index) => {
        const isPrimary = index === 0 ? true : false;
        await ProductImage.create({
          filename: imagename.filename,
          ProductId: result.id,
          fileType: imagename.mimetype,
          primary: isPrimary,
        });
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  //just for admin
  static async update(req, res, next) {
    try {
      const id = req.params.id;
      console.log(req.body);
      const {
        name,
        desc,
        price,
        stock,
        weight,
        category,
        condition,
        totalSold,
        rating,
        views,
      } = req.body;
      let result = await Product.update(
        {
          name,
          desc,
          price,
          stock,
          weight,
          category,
          condition,
          totalSold,
          rating,
          views,
        },
        {
          where: { id },
        }
      );
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  static async getProductById(req, res, next) {
    const id = req.params.id;
    try {
      let result = await Product.findByPk(id, {
        include: [ProductImage],
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
