const dto = require('../dto/dto');
const {Comments, User} = require("../shemas/shemas");

class CommentsService {
    async getComments(id) {
        try {
            const comments = await Comments.find({reviewID: id}).sort({created: -1});
            const com2 = comments.map(c => c.authorID);
            const users = await User.where({_id: com2});
            const users2 = users.map(u => ({id: u._id, photo: u.photo, name: u.name}));
            return comments.map((c) => {
                const author = users2.find(u => u.id == c.authorID);
                return {...dto.comment(c), author}
            });
        } catch (e) {
            throw e;
        }
    }

    async createComment(reviewID, authorID, text) {
        const comment = await Comments.create({reviewID, authorID, text});
        await comment.save();
        return dto.comment(comment);
    }

    async deleteComment(id, authorID) {
        const deleteComment = await Comments.deleteOne({_id: id, authorID});
        return dto.comment(deleteComment);
    }
}

module.exports = new CommentsService();