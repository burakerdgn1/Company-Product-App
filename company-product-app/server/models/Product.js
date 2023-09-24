const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productAmount: {
      type: Number,
      required: true,
    },
    amountUnit: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      ref: 'Company',
      required: true,
    },
  });

  module.exports = mongoose.model('Product', productSchema);
