const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const updateProduct=async(req,res)=>{
    const productId = req.params.id;

    try {
        // Find the product by ID and update its details
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
            new: true, // Return the updated document
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

  }

  const deleteProduct=async(req,res)=>{
    const productId = req.params.id;

    try {
        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

  }

  module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };