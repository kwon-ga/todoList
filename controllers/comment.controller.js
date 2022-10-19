const joi = require('joi');

const CommentsService = require('../services/comment.service');

class CommentsController {
    commentsService = new CommentsService();

    // createComment
    createComment = async(req, res, next) => {
        try {
            const { userId } = res.locals;
            const { postId } = req.params;
            const { comment } = req.body;

            const commentId = await this.commentsService.createComment(userId, postId, comment);
            const doc = {
                commentId,
                userId,
                postId,
                comment,
            };
            res.status(200).json({result: doc, msg: "코멘트 작성을 성공하였습니다."});
        } catch (error) {
            res.status(400).send(error);
        }
    }
    // deleteComment
    deleteComment = async(req, res, next) => {
        try {
            const { commentId } = req.params;
            const deleteValue = await this.commentsService.deleteComment(commentId);
            res.status(200).json({result: deleteValue, msg:"코멘트가 삭제되었습니다."});    
        } catch (error) {
            res.status(400).send(error);
        }
    }
    // updateComment
    updateComment = async(req, res, next) => {
        try {
            const { commentId } = req.params;
            const { comment } = req.body;

            const updateValue = await this.commentsService.updateComment(commentId, comment);
            res.status(200).json({result: updateValue, msg:"코멘트가 수정되었습니다.."});    
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = CommentsController;