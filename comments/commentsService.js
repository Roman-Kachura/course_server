const dto = require('../dto/dto');
const {Comments, User} = require("../shemas/shemas");

class CommentsService {
    async getComments(id) {
        try {
            const comments = await Comments.find({reviewID: id}).sort({created: -1});
            return comments.map(c => dto.comment(c));
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new CommentsService();