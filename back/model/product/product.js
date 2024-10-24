const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product: {
      type: String,
      required: true,
      trim: true,
      unique: true  
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0  
    },
    stock: {
      type: Number,
      required: true,
      min: 0  
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date
    }
  });
  
  productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const Product = mongoose.model('Product', productSchema);
  
  module.exports = Product;
  