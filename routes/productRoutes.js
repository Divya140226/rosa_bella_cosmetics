const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
router.get('/filter', productController.filterProduct);
router.get('/', productController.getAllProduct);
router.get('/search', productController.searchProductByName);
router.post('/add', productController.addProduct);
router.get('/:id', productController.getProductById);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;