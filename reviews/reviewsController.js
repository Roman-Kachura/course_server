const reviewsService = require('./reviewsService');

class ReviewsController {
    async getReviews(req, res, next) {
        try {
            const response = await reviewsService.getReviews(req.query);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ReviewsController();