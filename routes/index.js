const express = require("express");
const router = express.Router();

// 引入数据库连接
require("../db/init");

// express().get() 是直接在 Express 应用实例上定义路由的方式。
// express.Router() 创建一个新的路由实例，可以在这个实例上定义多个路由，并将其作为中间件集成到主应用（使用app.use）中。

/* 获取根目录下的首页 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });

  // try {
  //   const [rows] = await pool.query('SELECT * FROM users');
  //   res.json(rows);
  // } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Server error');
  // }
});

module.exports = router;
