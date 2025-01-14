const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// 用户注册
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // 检查用户名和邮箱是否已存在
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: '用户名或邮箱已存在' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    res.status(201).json({ message: '用户注册成功' });
  } catch (error) {
    res.status(500).json({ message: '注册失败', error: error.message });
  }
};

// 用户登录
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }

    // 生成 JWT 令牌
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: '登录成功', token });
  } catch (error) {
    res.status(500).json({ message: '登录失败', error: error.message });
  }
};

// 获取用户资料
exports.getUserProfile = async (req, res) => {
  try {
    // 获取请求头中的 token
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // 解码 JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 查找用户信息
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: '用户未找到' });
    }

    // 返回用户资料
    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: '获取用户资料失败', error: error.message });
  }
};
