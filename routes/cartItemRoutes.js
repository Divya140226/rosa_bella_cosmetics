const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');
router.get('/', cartItemController.getAllCartItem);

router.post('/add', cartItemController.addCartItem);
router.get('/:id', cartItemController.getCartItemById);

router.put('/update/:itemId', cartItemController.updateCartItem);
router.delete('/remove/:itemId', cartItemController.deleteCartItem);

module.exports = router;