const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const reviewsController = require('./reviewsController');
const {upload} = require('../upload/upload.service');
const authMiddleWare = require('../middlewares/authMiddleware');


router.use((req, res, next) => {
    next();
});

router.get('/', reviewsController.getReviews);
router.get('/:id', reviewsController.getReviewsItem);
router.post('/uploadfile', [
    upload.single('file'),
    authMiddleWare.checkAuthorization,
    check('title', 'Title length must be greater than 0 and less than 100!').isLength({min: 1, max: 100}),
    check('category', 'Category is empty!').notEmpty(),
    check('description', 'Description length must be greater than 0 and less than 5000!').isLength({min: 1, max: 5000}),
], reviewsController.createReview);


module.exports = router;