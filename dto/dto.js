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
    review(model){
        return{
            id:model._id,
            title:model.title,
            authorID:model.authorID,
            text:model.text,
            rating:model.rating,
            image:model.image,
            feedbacks:model._id,
            hashtags:model.hashtags,
            comments:model.comments,
            category:model.category
        }
    }

    comment(model){
        return{
            id:model._id,
            authorID:model.authorID,
            reviewID:model.reviewID,
            text:model.text,
            createAt:model.createAt,
        }
    }
}

module.exports = new Dto();