const {mongoose, Schema, model} = require("mongoose");

const UsersSchema = Schema({
    name: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: {type: String, require: true},
    photo:{type:String, default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'}
});

const TokenSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    token: {type: String, require: true}
});


const User = model('users', UsersSchema);
const Token = model('token', TokenSchema);

exports.UsersSchema = UsersSchema;
exports.Token = Token;
exports.User = User;
