const {User} = require("../shemas/shemas");
const ratingService = require('./ratingService');
const errorService = require('../error/errorService');

class RatingController {
    async getRating(req, res, next) {
        const {id, user} = req.query;
        try {
            const resolve = await ratingService.getRating(id, user);
            return res.status(200).json(resolve);
        } catch (e) {
            next(e);
        }
    }

    async changeRating(req, res, next) {
        const {id, user, value} = req.query;
        try {
            const isRate = await ratingService.getRating(id, user);
            if (isRate) return errorService.BadRequest('You already rated this review!');
            const resolve = await ratingService.changeRating(id, user, value);
            return res.status(200).json(resolve);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new RatingController();