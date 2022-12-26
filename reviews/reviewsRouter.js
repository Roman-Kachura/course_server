const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const reviewsController = require('./reviewsController');

router.use((req, res, next) => {
    next();
});

router.get('/', reviewsController.getReviews);
router.get('/:id', reviewsController.getReviewsItem);


module.exports = router;