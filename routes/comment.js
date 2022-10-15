const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const CommentsController = require('../controllers/comment.controller');
const commentsController = new CommentsController;

module.exports = router;