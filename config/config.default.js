﻿'use strict';
const fs = require('fs');
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // 端口修改
  config.cluster = {
    listen: {
      path: '',
      port: 81,
      hostname: '127.0.0.1',
    },
  };

  // 以读取本地文件的方式修改
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, '../app/public/favicon.ico')),
    '/robots.txt': fs.readFileSync(path.join(__dirname, '../app/public/robots.txt')),
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
    maxAge: 0, // in prod env, 0 in other envs
    buffer: false, // in prod env, false in other envs
    preload: false,
  };

  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.logger.error(err);
      console.error(err);
      ctx.body = 'error';
      ctx.status = 500;
    },
    errorPageUrl: '/500.html',
  };

  config.notfound = {
    pageUrl: '/404.html',
  };

  // 日志
  config.logger = {
    level: 'INFO',
  };

  // add your user config here
  config.template = 'qigong';
  config.apiService = 'api';


  return config;
};
