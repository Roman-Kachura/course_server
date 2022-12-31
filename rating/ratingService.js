const dto = require('../dto/dto');
const {Rating, Reviews, User} = require("../shemas/shemas");

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
            const updateRating = await Rating.updateOne({reviewID}, {$push: {ratings: {id: userID, value}}});
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