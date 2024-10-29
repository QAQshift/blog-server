const { executeQuery,pool } = require("./index");
const jwt = require('jsonwebtoken'); // 导入jsonwebtoken用于生成token

// 插入用户数据
const insertUser = async (name, email, password, img) => {
  const sql = `INSERT INTO blog.users (name, email, password, img) VALUES (?, ?, ?, ?)`;
  const result = await executeQuery(pool,sql, [name, email, password, img]); // 执行插入操作
  return result; // 返回插入结果
};

// 获取所有用户数据
const getAllUsers = async () => {
  const sql = `SELECT * FROM blog.users;`; // 查询所有用户
  const results = await executeQuery(pool,sql); // 执行查询
  return results; // 返回查询结果
};

const authenticateUser = async (name, password) => {
  const sql = `SELECT * FROM blog.users WHERE name = ? AND password = ?`; // 根据用户名和密码查询用户
  const results = await executeQuery(pool, sql, [name, password]); // 执行查询

  if (results.length > 0) { // 如果找到了用户
    const user = results[0]; // 获取第一个匹配的用户
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' }); // 生成token
    return {
      id: user.id,
      name: user.name,
      imgUrl: user.img,
      token, // 返回生成的token
    };
  }
  return null; // 如果未找到匹配的用户，返回null
};


// 导出所有查询函数
module.exports = {
  insertUser, // 导出插入用户的函数
  getAllUsers, // 导出获取所有用户的函数
  authenticateUser,  //导出登录的用户
};