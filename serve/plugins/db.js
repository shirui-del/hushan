module.exports = (app) => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://root:201213WEILAI@101.226.18.150:27017/blog", {
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