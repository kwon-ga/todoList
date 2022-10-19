const CommentsRepository = require('../repositories/comment.repository');

class CommentsService {
    commentsRepository = new CommentsRepository();

    // createComments
    createComment = async(userId, postId, comment) => {
        return await this.commentsRepository.createComment(userId, postId, comment);
    };

    // deleteComments
    deleteComment = async(commentId) => {
        return awaitthis.commentsRepository.deleteComment(commentId);
    };
    // updateComments
    updateComment = async(commentId, comment) => {
        return awaitthis.commentsRepository.updateComment(commentId, comment);
    };
}

module.exports = CommentsService;