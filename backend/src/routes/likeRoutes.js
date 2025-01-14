const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authMiddleware = require('../middlewares/authMiddleware');

// 点赞帖子
router.post('/like/:postId', authMiddleware, likeController.likePost);

// 取消点赞帖子
router.post('/unlike/:postId', authMiddleware, likeController.unlikePost);

module.exports = router;