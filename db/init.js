const {
  createUsersTable,
  createSubsetTable,
  createFileTable,
  createArticleTable,
  createPraiseTable,
  createCommentTable,
  createLabelTable,
  createDairyTable,
  createWeatherTable,
  createMessageTable,
  createRecordTable,
} = require("./queries");
const { createDatabase, databaseExists } = require("./index");
// 主函数来初始化数据库和表
const initDatabase = async () => {
  await createDatabase();
  if (await databaseExists("blog")) {
    console.log("数据库 'blog' 已存在.");
  } else {
    console.log("数据库 'blog' 创建成功.");
  }

  await createUsersTable();
  await createSubsetTable();
  await createFileTable();
  await createArticleTable();
  await createPraiseTable();
  await createCommentTable();
  await createLabelTable();
  await createDairyTable();
  await createWeatherTable();
  await createMessageTable();
  await createRecordTable();
};

// 执行初始化
initDatabase().catch((error) => {
  console.error("数据库初始化失败: ", error.message);
});
