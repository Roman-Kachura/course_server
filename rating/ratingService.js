const dto = require('../dto/dto');
const {Rating, Reviews, User} = require("../shemas/shemas");
const errorService = require("../error/errorService");

class RatingService {
    async getRating(reviewID, userID) {
        try {
            const ratings = await Rating.findOne({reviewID});
            if (ratings !== null) {
                const rate = ratings.ratings.find(u => u.id === userID);
                if(rate){
                    return rate.value;
                }
            }
            return 0;
        } catch (e) {
            throw e;
        }
    }

    async changeRating(reviewID, userID, value) {
        try {
            const review = await Reviews.findOne({_id:reviewID});
            if(review.authorID === userID) return errorService.BadRequest(`Author doesn't change rating of his review`);
            const updateRating = await Rating.updateOne({reviewID}, {$push: {ratings: {id: userID, value}}});
            const updateUser = await User.updateOne({_id:userID}, {$push: {rated: {id: reviewID, value}}});
            const rating = await Rating.findOne({reviewID});
            if (rating) {
                const feedbacks = rating.ratings.length;
                const newRating = rating.ratings.reduce((p, u) => p + u.value, 0) / feedbacks;
                const updateReview = await Reviews.updateMany({_id: reviewID}, {feedbacks, rating: newRating});
                return {
                    isRate: true,
                    rating: newRating
                }
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new RatingService();