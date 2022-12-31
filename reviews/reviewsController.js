const reviewsService = require('./reviewsService');
const UploadController = require('../upload/uploadController');
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
            const image = await UploadController.uploadImage(req, res, next);
            const review = await reviewsService.createReview({...req.body, image: image.url});
            return res.status(200).json({review});
        } catch (e) {
            next(e);
        }
    }

    async deleteReview(req, res, next) {
        try {
            const {id, authorID} = req.params;
            const resolve = await reviewsService.deleteReview(id, authorID);
            return res.status(200).json({message:'Review deleted successfully!'});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ReviewsController();