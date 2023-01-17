const {Reviews, Categories, Rating, Comments, User} = require('../shemas/shemas');
const usersService = require('../users/usersService');
const dto = require('../dto/dto');


class ReviewsService {
    async getReviews(query) {
        const getReviewsCount = 10;
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
            const res = {
                pagesCount,
                currentPage,
                reviews: reviews.map(r => dto.review(r)),
                sort: ['DATE UP', 'DATE DOWN', 'RATING UP', 'RATING DOWN'],
                search: {
                    sort: filter.sort.toUpperCase() || 'DATE DOWN',
                    category: filter.category?.toUpperCase() || '',
                    value,
                    hashtags
                }
            }
            return res;
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

    async createReview(review) {
        try {
            const {name, product, description, hashtags, image, category, authorID, rating} = await review;
            const h = hashtags.trim().split(' ');
            const resolve = await Reviews.create({
                name,
                product,
                text: description,
                image,
                category: category.toLowerCase(),
                authorID,
                authorRating: +rating,
                hashtags: h,
                feedbacks: 0,
                rating: 0,
            });
            resolve.save();
            const resolve2 = await Rating.create({reviewID: resolve._id});
            resolve2.save();
            return resolve;
        } catch (e) {
            throw e;
        }
    }

    async editReview(review) {
        try {
            const {name, product, description, hashtags, image, category, rating, id} = await review;
            const r = await Reviews.findOne({_id: id});
            const nr = dto.review(r);
            const img = image ? image : nr.image;
            const h = hashtags.trim().split(' ');
            const resolve = await Reviews.updateOne({_id: id}, {
                name,
                product,
                text: description,
                image: img,
                category: category.toLowerCase(),
                authorID: nr.authorID,
                authorRating: +rating,
                hashtags: h,
                feedbacks: 0,
                rating: 0,
            });
            return resolve;
        } catch (e) {
            throw e;
        }
    }

    async deleteReview(id, authorID) {
        try {
            const resolve = await Reviews.deleteOne({_id: id, authorID});
            await Comments.deleteMany({reviewID: id});
            await Rating.deleteMany({reviewID: id});
            await User.updateMany({$all: {rated: {id}}}, {$pull: {rated: {id}}})
            return resolve;
        } catch (e) {
            throw e;
        }
    }

    async changeReviewText(id, authorID, text) {
        try {
            const resolve = await Reviews.updateOne({_id: id, authorID}, {text});
            return resolve;
        } catch (e) {
            throw e;
        }
    }

    async getProfileReviews(id, query) {
        const {page} = query;
        const limit = 10;
        const skip = (query.page - 1) * limit;
        const sort = dto.sort(query.sort);

        try {
            const user = await User.findOne({_id: id});
            const ratedReviewsID = user.rated.map(r => r.id);
            const filter = dto.filterForUserTable(query, ratedReviewsID);
            const count = await Reviews.where(filter).countDocuments();
            const reviews = await Reviews.where(filter).sort(sort).skip(skip).limit(limit);
            return {
                currentPage: +page,
                pagesCount: Math.ceil(count / limit),
                reviews: reviews.map(r => dto.review(r)),
                sort: filter.sort.toUpperCase() || 'DATE DOWN',
                category: filter.category?.toUpperCase() || '',
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = new ReviewsService();