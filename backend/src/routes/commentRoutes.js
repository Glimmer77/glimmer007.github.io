const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

// 创建评论
router.post('/create/:postId', authMiddleware, commentController.createComment);

// 获取帖子的评论列表
router.get('/:postId', commentController.getCommentsByPostId);

module.exports = router;