const { Comments } = require('../models');

class CommentsRepository{
    createComment = async(userId, postId, comment) => {
        await Comments.create({
            userId,
            postId,
            comment,
            editCheck: false
        });
        return {msg: "comment created"};
    };
    updateComment = async(userId, postId, comment) => {
        await Comments.update(
            {where: {userId : userId, postId: postId}},
            {comment : comment, editCheck: true} 
        );
        return {msg: "comment updated"};
    };
    deleteComment = async(commentId) => {
        await Comments.delete({where: {commentId: commentId}});
        return {msg: "comment deleted"};
    };

}


module.exports = CommentsRepository;