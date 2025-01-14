const Post = require('../models/Post');

// 创建帖子
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;

    const newPost = new Post({
      userId,
      title,
      content,
    });

    await newPost.save();

    res.status(201).json({ message: '帖子创建成功', post: newPost });
  } catch (error) {
    res.status(500).json({ message: '创建帖子失败', error: error.message });
  }
};

// 获取帖子列表
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username');
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: '获取帖子列表失败', error: error.message });
  }
};

// 获取帖子详情
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('userId', 'username');
    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: '获取帖子详情失败', error: error.message });
  }
};

// 编辑帖子
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    if (post.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: '无权限编辑此帖子' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ message: '帖子更新成功', post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: '更新帖子失败', error: error.message });
  }
};

// 删除帖子
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    if (post.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: '无权限删除此帖子' });
    }

    await Post.findByIdAndDelete(req.params.postId);

    res.status(200).json({ message: '帖子删除成功' });
  } catch (error) {
    res.status(500).json({ message: '删除帖子失败', error: error.message });
  }
};

// 获取用户创建的帖子
exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('接收到的用户ID:', userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: '无效的用户ID' });
    }

    const posts = await Post.find({ userId: mongoose.Types.ObjectId(userId) }).populate('userId', 'username');
    res.status(200).json({ posts });
  } catch (error) {
    console.error('获取用户帖子失败:', error);
    res.status(500).json({ message: '获取用户帖子失败', error: error.message });
  }
};