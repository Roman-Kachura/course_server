const {Schema, model} = require("mongoose");


const TokenSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    token: {type: String, require: true}
});

const ReviewsSchema = Schema({
    name: {type: String, require: true},
    product: {type: String, require: true},
    authorID: {type: String, require: true},
    text: {type: String, require: true},
    rating: {type: Number, require: true},
    authorRating: {type: Number, require: true},
    image: {
        type: String,
        require: true,
        default: 'https://st.depositphotos.com/1186248/4970/i/450/depositphotos_49702593-stock-photo-review.jpg'
    },
    feedbacks: {type: Number, require: true},
    created: {type: Schema.Types.Date, require: true, default: Date.now()},
    hashtags: {type: [String], require: true, default: []},
    category: {type: String, require: true},
});

const CommentsSchema = Schema({
    authorID: {type: String, require: true},
    reviewID: {type: String, require: true},
    text: {type: String, require: true},
    order: {type: Number, require: true},
    created: {type: Date, require: true, default: Date.now()},
});

const CategoriesSchema = Schema({
    category: {type: String, require: true}
});
const RatingObjectType = Schema({
    id: {type: String, require: true},
    value: {type: Number, require: true}
})

const UsersSchema = Schema({
    name: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    rated: {type: [RatingObjectType], require: true, default: []},
    role: {type: String, require: true},
    photo: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
    }
});
const RatingSchema = Schema({
    reviewID: {type: String, require: true},
    ratings: {type: [RatingObjectType], require: true, default: []}
});

const User = model('users', UsersSchema);
const Token = model('tokens', TokenSchema);
const Reviews = model('reviews', ReviewsSchema);
const Comments = model('comments', CommentsSchema);
const Categories = model('categories', CategoriesSchema);
const Rating = model('ratings', RatingSchema);

exports.UsersSchema = UsersSchema;
exports.Token = Token;
exports.User = User;
exports.Reviews = Reviews;
exports.Comments = Comments;
exports.Categories = Categories;
exports.Rating = Rating;
