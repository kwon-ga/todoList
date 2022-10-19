const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const PostsController = require('../controllers/post.controller');
const postsController = new PostsController;

router.post('/',authMiddleware,postsController.createPosts);
router.put('/:postId',authMiddleware,postsController.updatePosts);
router.get('/:postId',postsController.findOneByPostId);
router.get('/',postsController.findAllPosts);
router.delete('/:postId',postsController.deletePosts);

module.exports = router;