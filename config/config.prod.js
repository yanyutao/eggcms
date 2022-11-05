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

  // cookie sign key
  config.keys = appInfo.name + '_1539507495248_1368';

  // add your config here
  config.middleware = [];

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

  config.token = {
    KEY: 'mingkong', // JSON WEB TOKEN KEY
    TIME: '1d', // 失效时间 10
  };

  config.md5 = {
    key: 'eggcms', // md5 加盐
  };

  // 关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 配置上传
  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    whitelist: [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.zip',
      '.gz',
      '.tgz',
      '.gzip',
      '.mp3',
      '.mp4',
      '.avi',
    ],
    fileExtensions: [ '.pdf', '.txt' ], // 扩展几种上传的文件格式
  };

  // 模板配置
  config.view = {
    defaultViewEngine: 'ejs',
    mapping: {
      '.html': 'ejs', // 左边写成.html后缀，会自动渲染.html文件
    },
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
    level: 'ERROR',
  };

  return config;
};
