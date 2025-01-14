const Comment = require('../models/Comment');

// 创建评论
exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;
    const postId = req.params.postId;

    const newComment = new Comment({
      postId,
      userId,
      content,
    });

    await newComment.save();

    res.status(201).json({ message: '评论创建成功', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: '创建评论失败', error: error.message });
  }
};

// 获取帖子的评论列表
exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate('userId', 'username');
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: '获取评论列表失败', error: error.message });
  }
};