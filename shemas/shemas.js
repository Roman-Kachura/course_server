const {mongoose, Schema, model} = require("mongoose");

const UsersSchema = Schema({
    name: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: {type: String, require: true},
    photo: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
    }
});

const TokenSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    token: {type: String, require: true}
});

const ReviewsSchema = Schema({
    title: {type: String, require: true},
    authorID: {type: String, require: true},
    text: {type: String, require: true},
    rating: {type: Number, require: true},
    image: {type: String, require: true},
    feedbacks: {type: Number, require: true},
    createAt: {type: Date, require: true},
    hashtags: {type: [String], require: true},
    category: {type: String, require: true},
});

const CommentsSchema = Schema({
    authorID: {type: String, require: true},
    reviewID: {type: String, require: true},
    text: {type: String, require: true},
    createAt: {type: Date, require: true},
});

const User = model('users', UsersSchema);
const Token = model('token', TokenSchema);
const Reviews = model('reviews', ReviewsSchema);
const Comments = model('comments', CommentsSchema);

exports.UsersSchema = UsersSchema;
exports.Token = Token;
exports.User = User;
exports.Reviews = Reviews;
exports.Comments = Comments;
