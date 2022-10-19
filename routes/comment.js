const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const CommentsController = require('../controllers/comment.controller');
const commentsController = new CommentsController;

router.post('/:postId', authMiddleware, commentsController.createComment);
router.put('/:commentId', authMiddleware, commentsController.updateComment);
router.delete('/:commentId', authMiddleware, commentsController.deleteComment);

module.exports = router;