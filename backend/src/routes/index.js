const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');

// 用户相关路由
router.use('/users', userRoutes);

// 帖子相关路由
router.use('/posts', postRoutes);

// 评论相关路由
router.use('/comments', commentRoutes);

// 点赞相关路由
router.use('/likes', likeRoutes);

module.exports = router;