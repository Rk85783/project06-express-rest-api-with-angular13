const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const productModel = model("product", productSchema);
module.exports = productModel;
