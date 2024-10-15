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
  getAllProducts: async (req, res) => {
    try {
      const { page = 1, limit = 10, orderBy = "createdAt", orderDir = "DESC" } = req.query;

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      // Define sorting order, convert orderDir correctly (1 for ASC, -1 for DESC)
      const sort = {};
      sort[orderBy] = orderDir.toUpperCase() === "DESC" ? -1 : 1;

      // Fetch paginated data with sorting
      const products = await productModel.find()
        .sort(sort)
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum);

      // Count total documents
      const totalProducts = await productModel.countDocuments();

      // Calculate total pages
      const totalPages = Math.ceil(totalProducts / limitNum);

      // Return the response
      return res.status(200).json({
        success: true,
        message: messages.DATA_FOUND,
        data: {
          totalProducts,
          totalPages,
          currentPage: pageNum,
          products
        }
      });
    } catch (error) {
      console.error("getAllProducts(): catch(): error : ", error);
      return res.status(500).json({
        success: false,
        message: messages.INTERNAL_SERVER_ERROR
      });
    }
  },
  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;

      const product = await productModel.findById(productId);

      return res.status(200).json({
        success: true,
        message: messages.DATA_FOUND,
        data: product
      });
    } catch (error) {
      console.error("getProductById(): catch(): error : ", error);
      return res.status(500).json({
        success: false,
        message: messages.INTERNAL_SERVER_ERROR
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: messages.ALL_FIELDS_REQUIRED
        });
      }

      const updatedProduct = await productModel.findByIdAndUpdate(productId, {
        title,
        description
      });
      if (!updatedProduct) {
        return res.status(400).json({
          success: false,
          message: messages.DATA_NOT_FOUND
        });
      }

      return res.status(200).json({
        success: true,
        message: messages.UPDATE_SUCCESS
      });
    } catch (error) {
      console.error("getProductById(): catch(): error : ", error);
      return res.status(500).json({
        success: false,
        message: messages.INTERNAL_SERVER_ERROR
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;

      const deletedProduct = await productModel.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(400).json({
          success: false,
          message: messages.DATA_NOT_FOUND
        });
      }

      return res.status(200).json({
        success: true,
        message: messages.DELETE_SUCCESS
      });
    } catch (error) {
      console.error("getProductById(): catch(): error : ", error);
      return res.status(500).json({
        success: false,
        message: messages.INTERNAL_SERVER_ERROR
      });
    }
  }
};
