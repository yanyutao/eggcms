'use strict';
const egg = require('egg');
const workers = 1 || Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers,
 // mode: 'single',
  baseDir: __dirname,
  ignoreWarning: true,
});


process.on('uncaughtException', function (err) {
  //打印出错误
  console.error(err);
  //打印出错误的调用栈方便调试
  console.error(err.stack);
});
