const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);

router.post('/products', productController.createProduct);

router.patch('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
