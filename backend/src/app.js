const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const app = express();

// 连接数据库
connectDB();

// CORS 配置 - 只允许特定的域名进行跨域请求
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',  // 从环境变量读取 CORS 允许的域名
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // 允许的请求方法
  allowedHeaders: ['Content-Type', 'Authorization'],  // 允许的请求头
  credentials: true,  // 允许跨域请求时携带认证信息
};

app.use(cors(corsOptions));

// 使用 express.json 中间件解析 JSON 请求体
app.use(express.json());

// 路由
app.use('/api', require('./routes'));


// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
