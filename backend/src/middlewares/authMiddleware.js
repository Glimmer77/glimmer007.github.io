const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// 认证中间件
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: '未授权' });
  }
};

module.exports = authMiddleware;