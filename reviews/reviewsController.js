const reviewsService = require('./reviewsService');
const {uploadImage} = require('../upload/upload.controller');
const {validationResult} = require("express-validator");
const errorService = require("../error/errorService");


class ReviewsController {
    async getReviews(req, res, next) {
        try {
            const response = await reviewsService.getReviews(req.query);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getReviewsItem(req, res, next) {
        try {
            const response = await reviewsService.getReviewsItem(req.params.id);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async createReview(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(errorService.BadRequest('Errors of registration', errors.array()));
        }
        try {
            const image = await uploadImage(req, res, next);
            const review = await reviewsService.createReview({...req.body, image: image.url});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ReviewsController();