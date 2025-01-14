const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // 确保路径正确
const mongoose = require('mongoose'); // 确保导入 mongoose
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

// 创建帖子
router.post('/create', authMiddleware, postController.createPost);

// 获取帖子列表
router.get('/list', postController.getPosts);

// 获取帖子详情
router.get('/:postId', postController.getPostById);

// 编辑帖子
router.put('/:postId', authMiddleware, postController.updatePost);

// 删除帖子
router.delete('/:postId', authMiddleware, postController.deletePost);

// 获取用户创建的帖子
router.get('/user/:userId', postController.getPostsByUser);

module.exports = router;