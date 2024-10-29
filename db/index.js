// net start mysql 启动数据库 需要 mysqld --install
// mysql -u root -p 登录数据库

//mysql2 支持 Promise 和更好的性能
const mysql = require("mysql2/promise"); // 使用基于 Promise 的版本
require("dotenv").config({ path: './config/.env' }); // 加载环境变量

// 创建未指定数据库的连接池
const generalPool = mysql.createPool({
  host: process.env.DB_HOST, // 数据库主机
  user: process.env.DB_USER, // 数据库用户名
  password: process.env.DB_PASSWORD, // 数据库密码
});

// 初始化指定数据库的连接池
let pool = mysql.createPool({
  host: process.env.DB_HOST, // 数据库主机
  user: process.env.DB_USER, // 数据库用户名
  password: process.env.DB_PASSWORD, // 数据库密码
  database: "blog", // 直接指定数据库为 blog
});

// 封装数据库操作的函数
const executeQuery = async (pool, sql, values = []) => {
  let connection;
  try {
    connection = await pool.getConnection(); // 从连接池获取连接
    const [results] = await connection.query(sql, values); // 执行查询
    return results; // 返回结果
  } catch (error) {
    console.error("查询失败: ", error.message);
    throw error; // 抛出错误
  } finally {
    if (connection) connection.release(); // 确保连接被释放
  }
};

// 创建数据库（如果不存在）
const createDatabase = async () => {
  const sql = `CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARSET utf8 COLLATE utf8_general_ci`;
  await executeQuery(generalPool, sql);
};

// 检查数据库是否存在
const databaseExists = async (dbName) => {
  const sql = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`;
  const results = await executeQuery(generalPool, sql, [dbName]);
  return results.length > 0; // 如果返回结果大于 0，表示数据库存在
};

module.exports = {
  pool,
  executeQuery,
  createDatabase,
  databaseExists,
};
