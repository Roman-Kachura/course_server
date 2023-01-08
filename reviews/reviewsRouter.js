const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const reviewsController = require('./reviewsController');
const {upload} = require('../upload/uploadService');
const authMiddleWare = require('../middlewares/authMiddleware');


router.use((req, res, next) => {
    next();
});

router.get('/', reviewsController.getReviews);
router.get('/profile/:id', reviewsController.getProfileReviews);
router.get('/:id', reviewsController.getReviewsItem);
router.delete('/:id/:authorID', reviewsController.deleteReview);
router.post('/create', [
    upload.single('file'),
    authMiddleWare.checkAuthorization,
    check('name', 'Review Name length must be greater than 0 and less than 100!').isLength({min: 1, max: 100}),
    check('product', 'Name of product length must be greater than 0 and less than 100!').isLength({min: 1, max: 100}),
    check('category', 'Category is empty!').notEmpty(),
    check('description', 'Description length must be greater than 0 and less than 5000!').isLength({min: 1, max: 5000}),
], reviewsController.createReview);
router.post('/edit', [
    upload.single('file'),
    authMiddleWare.checkAuthorization,
    check('name', 'Review Name length must be greater than 0 and less than 100!').isLength({min: 1, max: 100}),
    check('product', 'Name of product length must be greater than 0 and less than 100!').isLength({min: 1, max: 100}),
    check('category', 'Category is empty!').notEmpty(),
    check('description', 'Description length must be greater than 0 and less than 5000!').isLength({min: 1, max: 5000}),
], reviewsController.editReview);


module.exports = router;