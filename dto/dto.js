const {log} = require("util");

class Dto {
    user(model) {
        return {
            id: model._id,
            name: model.name,
            email: model.email,
            role: model.role,
            photo: model.photo
        }
    }

    review(model) {
        return {
            id: model._id,
            title: model.title.toUpperCase(),
            authorID: model.authorID,
            text: model.text,
            rating: model.rating,
            image: model.image,
            feedbacks: model._id,
            hashtags: model.hashtags,
            category: model.category,
            created: model.created
        }
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
        const {category, sort, search, hashtags} = query;
        const filter = {};
        if (category) filter.category = category.toLowerCase();
        if (search) filter.title = RegExp(search, 'gi');
        if (sort) filter.sort = sort.toLowerCase();
        if (hashtags) filter.hashtags = {$all: RegExp(hashtags, 'gi')};
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
}

module.exports = new Dto();