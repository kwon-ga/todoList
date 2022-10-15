const express = require('express');
const router = express.Router();

const commentsRouter = require('./comment.js');
const postsRouter = require('./post.js');
const userRouter = require('./user.js');
const todoRouter = require('./todo.js');

router.use("/comments", commentsRouter);
router.use("/posts", postsRouter);
router.use("/user", userRouter);
router.use("/todo", todoRouter);

module.exports = router; 