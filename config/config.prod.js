'use strict';
module.exports = appInfo => {
  const config = exports = {};

  // 端口修改
  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '127.0.0.1',
    },
  };

  // add mysql config
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'eggcms',
      debug: false, // 打印sql
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,

  };

  config.static = {
    prefix: '/public/',
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    dir: [ 'app/public' ],
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
    preload: false,
  };

  // 模板
  config.template = 'qigong';

  // 日志
  config.logger = {
    level: 'INFO',
  };

  return config;
};
