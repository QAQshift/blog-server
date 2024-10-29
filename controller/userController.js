const user = require("../db/user");

// 获取用户
exports.getUsers = async (req, res) => {
  try {
    const users = await user.getAllUsers(); // 获取所有用户数据
    res.send({ code: 200, data: users }); // 规范化返回格式
  } catch (error) {
    console.error("获取用户数据失败: ", error.message);
    res.send({ code:500,error: "获取用户数据失败" }); // 返回错误信息
  }
};

// 用户登录
exports.signin = async (req, res) => {
  const { name, password } = req.body; // 从请求体中获取用户名和密码

  try {
    // 验证用户凭据
    const userData = await user.authenticateUser(name, password); // 假设你有这样的方法
    if (!userData) {
      return res.send({ code: 400, error: "账号或密码错误" }); // Token未通过
    }

    // 返回成功的用户信息
    res.send({
      code: 200,
      data: {
        id: userData.id,
        name: userData.name,
        imgUrl: userData.imgUrl,
        token: userData.token, // 假设token在userData中
      },
    });
  } catch (error) {
    console.error("用户登录失败: ", error.message);
    res.send({ code: 500, error: "服务器错误" }); // 返回服务器错误
  }
};
