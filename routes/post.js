const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const PostsController = require('../controllers/post.controller');
const postsController = new PostsController;

router.post('/',authMiddleware,postsController.createPosts);

module.exports = router;