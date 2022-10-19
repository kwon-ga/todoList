const { Comments } = require('../models');

class CommentsRepository{
    createComment = async(userId, postId, comment) => {
        const commentInfo = await Comments.create({
            userId,
            postId,
            comment,
            editCheck: false
        });
        console.log(commentInfo)
        return commentInfo.commentId;
    };
    updateComment = async(commentId, comment) => {
        const updateValue = await Comments.update(
            {where: {commentId : commentId}},
            {comment : comment, editCheck: true} 
        );
        return updateValue;
    };
    deleteComment = async(commentId) => {
        const deleteValue = await Comments.delete({where: {commentId: commentId}});
        return deleteValue;
    };

}


module.exports = CommentsRepository;