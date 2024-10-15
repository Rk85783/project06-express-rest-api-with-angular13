const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

const router = require("express").Router();

// auth routes
router.post("/auth/login", authController.login);
router.post("/auth/signup", authController.signup);

// product routes
router.post("/product", productController.createProduct);
router.get("/product", productController.getAllProducts);
router.route("/product/:id")
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
