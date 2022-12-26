const {Reviews, Categories} = require('../shemas/shemas');
const usersService = require('../users/usersService');
const dto = require('../dto/dto');

class ReviewsService {
    async getReviews(query) {
        const getReviewsCount = 12;
        const sort = dto.sort(query.sort);
        const filter = dto.filter(query);
        const currentPage = +query.currentPage;
        let value = '';
        let hashtags = '';
        if (query.search) value = query.search;
        if (query.hashtags) hashtags = query.hashtags;
        try {
            const c = await Reviews.find(filter).countDocuments();
            const pagesCount = +Math.ceil(c / getReviewsCount);
            const skip = (currentPage - 1) * getReviewsCount;
            const reviews = await Reviews.find(filter).skip(skip).limit(getReviewsCount).sort(sort);
            const categories = await Categories.find({});
            return {
                pagesCount,
                currentPage,
                reviews: reviews.map(r => dto.review(r)),
                categories: categories.map(c => dto.categories(c)),
                sort: ['DATE UP', 'DATE DOWN', 'RATING UP', 'RATING DOWN'],
                search: {
                    sort: filter.sort.toUpperCase() || 'DATE DOWN',
                    category: filter.category?.toUpperCase() || '',
                    value,
                    hashtags
                }
            }
        } catch (e) {
            throw e;
        }
    }

    async getReviewsItem(id) {
        try {
            const item = await Reviews.findOne({_id: id});
            const user = await usersService.getUser(item.authorID);
            return {...dto.review(item), author: user.name};
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new ReviewsService();