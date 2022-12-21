const reviewsService = require('./reviewsService');

class ReviewsController {
    async getReviews(req, res, next) {
        const category = req.query.category;
        try {
            const response = await reviewsService.getReviews(category);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ReviewsController();