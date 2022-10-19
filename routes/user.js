const express = require('express');
const router = express.Router();
const isLoginMiddleware = require('../middlewares/isLoginMiddleware');

const UsersController = require('../controllers/user.controller');
const usersController = new UsersController;

// 회원가입
router.post('/signup',isLoginMiddleware,usersController.userSignup);

// 로그인
router.post('/login',isLoginMiddleware,usersController.userLogin);

// 로그아웃 -> 로그인이 된 상태에서만 접근이 가능해야한다 // 10-18
router.post('/logout',usersController.userLogout);

module.exports = router;