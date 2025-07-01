const express = require('express');
const router = express.Router();
const brandsController = require('../controllers/brandsController');
router.get('/', brandsController.getAllBrands);

router.post('/add', brandsController.addBrands);
router.get('/:id', brandsController.getBrandsById);
router.put('/update/:id', brandsController.updateBrands);
router.delete('/delete/:id', brandsController.deleteBrands);

module.exports = router;