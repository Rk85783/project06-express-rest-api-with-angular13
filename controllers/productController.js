const productModel = require("../models/productModel");
const messages = require("../utils/constantMessages");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: messages.ALL_FIELDS_REQUIRED
        });
      }

      const newProduct = await productModel.create({
        title,
        description
      });
      return res.status(201).json({
        success: true,
        message: messages.CREATE_SUCCESS,
        data: newProduct
      });
    } catch (error) {
      console.error("createProduct(): catch(): error : ", error);
      return res.status(500).json({
        success: false,
        message: messages.INTERNAL_SERVER_ERROR
      });
    }
  },
  getAllProducts: (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Data found"
    });
  },
  getProductById: (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Data found"
    });
  },
  updateProduct: (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Updated successfully"
    });
  },
  deleteProduct: (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Deleted successfully"
    });
  }
};
