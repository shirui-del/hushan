module.exports = (app) => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://liurx:201213WEIlai@60.205.185.94:27017/admin", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  }).then(
    console.log('数据库连接成功')
  )
  require("require-all")(__dirname + "/../models");
};