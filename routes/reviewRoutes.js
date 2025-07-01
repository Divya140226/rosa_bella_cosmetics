const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewController');
router.get('/', reviewsController.getAllReviews);

router.post('/add', reviewsController.addReviews);
router.get('/:id', reviewsController.getReviewsById);
router.put('/update/:id', reviewsController.updateReviews);
router.delete('/delete/:id', reviewsController.deleteReviews);

module.exports = router;