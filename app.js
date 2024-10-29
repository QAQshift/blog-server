const express = require('express');
const cors = require('cors');
const path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var env = require('dotenv');
// 加载 .env 文件
env.config({ path: './config/.env' });

var constants = require('./config/default');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




var app = express();

// 提供前端打包后的静态文件
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'data')));
app.use(express.static(path.join(__dirname, 'public')));

// 使用 CORS 中间件
app.use(cors());

// 针对特定路由设置 CORS
// app.get('/api/data', cors(), (req, res) => {
//   res.json({ message: 'Hello from the backend!' });
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 使用 express.json() 中间件 json数据将会在req.body解析成对象
app.use(express.json());

// 使用 express.urlencoded() 中间件 解析 URL 编码的数据（如表单提交的数据）
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());



// 后端路由

// 根路径路由 返回的是index的渲染模版
app.use('/', indexRouter); 
app.use('/users', usersRouter);

// 捕获 404 错误并转发到错误处理器
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理器
app.use(function(err, req, res, next) {
  // res.locals 是一个用于存储在响应中可用的本地变量的对象
  // 任何放入 res.locals 的数据都会在后续的中间件和视图渲染中可用

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  // 使用模板引擎渲染名为 error 的错误页面
  // 使用 res.locals 中的数据来填充模板
  res.render('error');
});

module.exports = app;
