const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    open: true, //自动打开浏览器
  },
  lintOnSave: true,
});
