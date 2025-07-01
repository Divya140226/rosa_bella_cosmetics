const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
router.get('/', orderController.getAllOrder);

router.post('/add', orderController.addOrder);
router.get('/:id', orderController.getOrderById);
router.put('/update/:id', orderController.updateOrder);
router.put('/delete/:id', orderController.deleteOrder);

module.exports = router;