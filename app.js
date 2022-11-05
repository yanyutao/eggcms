'use strict';
const egg = require('egg');
const workers = 1 || Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers,
  mode: 'single',
  baseDir: __dirname,
  ignoreWarning: true,
});
