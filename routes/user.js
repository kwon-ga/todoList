const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const UsersController = require('../controllers/user.controller');
const usersController = new UsersController;

// 회원가입
// 로그인

module.exports = router;