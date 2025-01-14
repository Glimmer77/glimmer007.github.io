const Like = require('../models/Like');
const Post = require('../models/Post');

// 点赞帖子
exports.likePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.postId;

    // 检查用户是否已经点赞
    const existingLike = await Like.findOne({ userId, postId });
    if (existingLike) {
      return res.status(400).json({ message: '你已经点赞过此帖子' });
    }

    // 创建新的点赞记录
    const newLike = new Like({
      userId,
      postId,
    });

    await newLike.save();

    // 更新帖子的点赞数
    await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

    res.status(201).json({ message: '点赞成功' });
  } catch (error) {
    res.status(500).json({ message: '点赞失败', error: error.message });
  }
};

// 取消点赞帖子
exports.unlikePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.postId;

    // 检查用户是否已经点赞
    const existingLike = await Like.findOne({ userId, postId });
    if (!existingLike) {
      return res.status(400).json({ message: '你尚未点赞此帖子' });
    }

    // 删除点赞记录
    await Like.findByIdAndDelete(existingLike._id);

    // 更新帖子的点赞数
    await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });

    res.status(200).json({ message: '取消点赞成功' });
  } catch (error) {
    res.status(500).json({ message: '取消点赞失败', error: error.message });
  }
};