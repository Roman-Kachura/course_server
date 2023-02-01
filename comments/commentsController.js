const commentsService = require('./commentsService');
const {User} = require("../shemas/shemas");

class CommentsController {
    async messageHandler(ws, msg) {
        const m = JSON.parse(msg);
        switch (m.method) {
            case 'connect': {
                const comments = await commentsService.getComments(m.id, m.page);
                return ws.send(JSON.stringify({comments, method: 'connect'}));
            }
            case 'create-comment': {
                await commentsService.createComment(m.reviewID, m.authorID, m.text);
                const comments = await commentsService.getComments(m.reviewID, 1);
                return ws.send(JSON.stringify({comments, method: 'create-comment'}));
            }
            case 'delete-comment': {
                await commentsService.deleteComment(m.id, m.authorID);
                const comments = await commentsService.getComments(m.reviewID, 1);
                return ws.send(JSON.stringify({comments, method: 'delete-comment'}));
            }
        }
    }

    async getComments(req, res, next) {
        try {
            const comments = await commentsService.getComments(req.params.id, +req.query.page);
            return res.status(200).json(comments);
        } catch (e) {
            next(e);
        }
    }

    async createComment(req, res, next) {
        const {reviewID, authorID, text} = req.body;
        try {
            const comment = await commentsService.createComment(reviewID, authorID, text);
            return res.status(200).json(comment);
        } catch (e) {
            next(e);
        }
    }

    async deleteComment(req, res, next) {
        const {id, authorID} = req.params;
        try {
            const comment = await commentsService.deleteComment(id, authorID);
            return res.status(200).json(comment);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CommentsController();