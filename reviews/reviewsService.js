const {Reviews, User} = require('../shemas/shemas');
const dto = require('../dto/dto');

class ReviewsService {
    async getReviews(category, currentPage = 1) {
        const getReviewsCount = 12;
        const filter = {}
        if(category) filter.category = category;
        try {
            const c = await Reviews.find(filter).countDocuments();
            const pagesCount = Math.ceil(c / getReviewsCount);
            const skip = (currentPage - 1) * getReviewsCount;
            const reviews = await Reviews.find(filter).skip(skip).limit(getReviewsCount);
            return {
                pagesCount,
                currentPage,
                reviews: reviews.map(r => dto.review(r))
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new ReviewsService();