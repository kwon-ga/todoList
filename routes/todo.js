const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const TodosController = require('../controllers/todo.controller');
const todosController = new TodosController;

// todo 만들기
// todo 삭제
// todo 클리어

module.exports = router;