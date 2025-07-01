const express = require('express');
const router = express.Router();
const wishlistItemsController = require('../controllers/wishlistItemsController');
router.get('/', wishlistItemsController.getAllWishlistItems);
router.post('/add', wishlistItemsController.addWishlistItems);
router.get('/:id', wishlistItemsController.getwishlistItemsById);
router.put('/update/:itemId', wishlistItemsController.updatewishlistItems);
router.delete('/remove/:itemId', wishlistItemsController.deleteWishlistItems);

module.exports = router;