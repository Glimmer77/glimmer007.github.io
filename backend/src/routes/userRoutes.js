const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 用户注册
router.post('/register', userController.registerUser);

// 用户登录
router.post('/login', userController.loginUser);

// 获取用户资料
router.get('/user/profile', userController.getUserProfile);

module.exports = router;
