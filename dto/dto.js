const {log} = require("util");
const {User} = require("../shemas/shemas");

class Dto {
    user(model) {
        return {
            id: model._id,
            name: model.name,
            uid: model.uid,
            email: model.email,
            role: model.role,
            photo: model.photo
        }
    }

    review(model) {
        const res = {
            id: model._id,
            name: model.name.toUpperCase(),
            product: model.product.toUpperCase(),
            authorID: model.authorID,
            authorRating: model.authorRating,
            text: model.text,
            rating: +model.rating.toFixed(1),
            image: model.image,
            feedbacks: +model.feedbacks,
            hashtags: model.hashtags,
            category: model.category,
            created: model.created
        }
        return res;
    }

    comment(model) {
        return {
            id: model._id,
            authorID: model.authorID,
            reviewID: model.reviewID,
            text: model.text,
            created: model.created,
        }
    }

    categories(model) {
        return model.category.toUpperCase();
    }

    filter(query) {
        const {category, sort, search, hashtags, author} = query;
        const filter = {};
        if (category) filter.category = category.toLowerCase();
        if (search) filter.name = RegExp(search, 'gi');
        if (sort) filter.sort = sort.toLowerCase();
        if (hashtags) filter.hashtags = {$all: RegExp(hashtags, 'gi')};
        if (author) filter.authorID = author;
        return filter;
    }

    filterForUserTable(query,reviewsID){
        const {category, sort} = query;
        const filter = {};
        if (category) filter.category = category.toLowerCase();
        if (reviewsID) filter._id = reviewsID;
        if (sort) filter.sort = sort.toLowerCase();
        return filter;
    }

    sort(value) {
        switch (value) {
            case 'DATE UP':
                return {created: 1};
            case 'DATE DOWN':
                return {created: -1};
            case 'RATING UP':
                return {rating: 1};
            case 'RATING DOWN':
                return {rating: -1}
            default:
                return {created: -1};
        }
    }

    helpText(value){
        const filter = {};
        if(value.charAt(0) === '#'){
            filter.hashtags = {$all: RegExp(`^${value}`, 'gi')};
        } else{
            filter.name = RegExp(`^${value}`, 'gi');
        }
        return filter;
    }
}

module.exports = new Dto();