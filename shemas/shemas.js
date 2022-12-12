const {mongoose, Schema, model} = require("mongoose");

const UsersSchema = Schema({
    name: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: {type: String, require: true}
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
