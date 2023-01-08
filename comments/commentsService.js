const dto = require('../dto/dto');
const {Comments, User} = require("../shemas/shemas");

class CommentsService {
    async getComments(id,page) {
        try {
            const count = await Comments.find({reviewID: id}).countDocuments();
            const skip =  (page - 1) * 10;
            const comments = await Comments.find({reviewID: id}).sort({order: -1}).skip(skip).limit(10);
            const com2 = comments.map(c => c.authorID);
            const users = await User.where({_id: com2});
            const users2 = users.map(u => ({id: u._id, photo: u.photo, name: u.name}));
            const com3 = comments.map((c) => {
                const author = users2.find(u => u.id == c.authorID);
                return {...dto.comment(c), author}
            });
            return {
                comments:com3,
                page,
                count,
                pagesCount:Math.ceil(count / 10)
            }
        } catch (e) {
            throw e;
        }
    }

    async createComment(reviewID, authorID, text) {
        const count = await Comments.find({reviewID}).countDocuments();
        const comment = await Comments.create({reviewID, authorID, text,order:count + 1});
        await comment.save();
        return dto.comment(comment);
    }

    async deleteComment(id, authorID) {
        const deleteComment = await Comments.deleteOne({_id: id, authorID});
        return dto.comment(deleteComment);
    }
}

module.exports = new CommentsService();