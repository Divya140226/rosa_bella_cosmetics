const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
router.get('/', categoriesController.getAllCategories);

router.post('/add', categoriesController.addCategories);
router.get('/:id', categoriesController.getCategoriesById);
router.put('/update/:id', categoriesController.updateCategories);
router.delete('/delete/:id', categoriesController.deleteCategories);

module.exports = router;