'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, config } = app;
  const auth = middleware.auth({ token: config.token });
  const init = middleware.init({}, app);

  // 首页模板
  router.get('/', init, controller[config.template].home.index);

  // 分类
  router.get([
    '/list/:cid',
    '/c/:cate/index.html',
    '/c/:cate/index:current.html',
    '/c/:cate1/:cate/index.html',
    '/c/:cate1/:cate/index:current.html',
    '/c/:cate2/:cate1/:cate/index.html',
    '/c/:cate2/:cate1/:cate/index:current.html',
    '/c/:cate3/:cate2/:cate1/:cate/index.html',
    '/c/:cate3/:cate2/:cate1/:cate/index:current.html' ], init, controller[config.template].home.list);

  // 文章页
  router.get([
    '/article/:id',
    '/article/:id.html',
    '/a/:id.html',
    '/a/:cate/:id.html',
    '/a/:cate1/:cate/:id.html',
    '/a/:cate2/:cate1/:cate/:id.html',
    '/a/:cate2/:cate1/:cate/:id.html',
    '/a/:cate3/:cate2/:cate1/:cate/:id.html',
  ], init, controller[config.template].home.article);

  // 搜索页
  router.get([
    '/search/:keywords/index.html',
    '/search/:keywords/index:id.html' ], init, controller[config.template].home.search);

  // router.get('/page/:id', init, controller.web.home.page);

  // 验证码
  router.get('/api/captcha', controller.api.base.captcha); // 验证码
  router.post('/api/checkCaptcha', controller.api.base.checkCaptcha);

  // copy 爬虫
  router.get('/copy', controller.copy.home.index);
  router.get('/copy/ruiwen', controller.copy.home.ruiwen);

  // 登录
  router.post('/api/admin/login', controller.api.admin.login);
  router.post('/api/admin/create', controller.api.admin.create);
  router.get('/api/admin/list', controller.api.admin.list);
  router.get('/api/admin/search', controller.api.admin.search);
  router.get('/api/admin/detail', controller.api.admin.detail);
  router.post('/api/admin/create', auth, controller.api.admin.create);
  router.get('/api/admin/delete', auth, controller.api.admin.delete);
  router.post('/api/admin/update', auth, controller.api.admin.update);


  // 站点信息
  router.get('/api/site/find', auth, controller.api.site.find);
  router.post('/api/auth/site/updateInfo', auth, controller.api.site.updateInfo);
  router.post('/api/auth/site/updateSeo', auth, controller.api.site.updateSeo);
  router.get('/api/site/runEnv', controller.api.site.runEnv);


  // 网站栏目
  router.get('/api/category/find', controller.api.category.find);
  router.get('/api/category/findId', controller.api.category.findId);
  router.get('/api/category/findSubId', controller.api.category.findSubId);
  router.get('/api/category/search', controller.api.category.search);
  router.get('/api/auth/category/delete', auth, controller.api.category.delete);
  router.post('/api/auth/category/update', auth, controller.api.category.update);
  router.post('/api/auth/category/create', auth, controller.api.category.create);

  // 文章栏目
  router.get('/api/article/list', controller.api.article.list);
  router.get('/api/article/tongji', controller.api.article.tongji);
  router.get('/api/article/search', controller.api.article.search);
  router.get('/api/article/detail', controller.api.article.detail);
  router.get('/api/article/findField', auth, controller.api.article.findField);
  router.post('/api/article/create', auth, controller.api.article.create);
  router.get('/api/article/delete', auth, controller.api.article.delete);
  router.post('/api/article/update', auth, controller.api.article.update);
  router.post('/api/upload', auth, controller.api.article.upload);

  // 页面管理
  router.get('/api/page/list', controller.api.page.list);
  router.get('/api/page/search', controller.api.page.search);
  router.get('/api/page/detail', controller.api.page.detail);
  router.post('/api/page/create', auth, controller.api.page.create);
  router.get('/api/page/delete', auth, controller.api.page.delete);
  router.post('/api/page/update', auth, controller.api.page.update);

  // 模型管理
  router.get('/api/model/list', controller.api.model.list);
  router.get('/api/model/detail', controller.api.model.detail);
  router.get('/api/model/hasUse', auth, controller.api.model.hasUse);
  router.post('/api/model/create', auth, controller.api.model.create);
  router.post('/api/model/delete', auth, controller.api.model.delete);
  router.post('/api/model/update', auth, controller.api.model.update);

  // 字段管理
  router.get('/api/field/list', controller.api.field.list);
  router.get('/api/field/detail', controller.api.field.detail);
  router.post('/api/field/create', auth, controller.api.field.create);
  router.get('/api/field/delete', auth, controller.api.field.delete);
  router.post('/api/field/update', auth, controller.api.field.update);

  // 碎片管理
  router.get('/api/frag/list', controller.api.frag.list);
  router.get('/api/frag/search', controller.api.frag.search);
  router.get('/api/frag/detail', controller.api.frag.detail);
  router.post('/api/frag/create', auth, controller.api.frag.create);
  router.get('/api/frag/delete', auth, controller.api.frag.delete);
  router.post('/api/frag/update', auth, controller.api.frag.update);

  // tag标签管理
  router.get('/api/tag/list', controller.api.tag.list);
  router.post('/api/tag/create', auth, controller.api.tag.create);
  router.get('/api/tag/detail', controller.api.tag.detail);
  router.get('/api/tag/has', controller.api.tag.has);
  router.get('/api/tag/search', controller.api.tag.search);
  router.get('/api/tag/delete', auth, controller.api.tag.delete);
  router.post('/api/tag/update', auth, controller.api.tag.update);

  // 友情链接
  router.get('/api/friendlink/list', controller.api.friendlink.list);
  router.get('/api/friendlink/detail', controller.api.friendlink.detail);
  router.post('/api/friendlink/create', auth, controller.api.friendlink.create);
  router.get('/api/friendlink/delete', auth, controller.api.friendlink.delete);
  router.post('/api/friendlink/update', auth, controller.api.friendlink.update);

  // 广告管理
  router.get('/api/ad/list', controller.api.ad.list);
  router.get('/api/ad/search', controller.api.ad.search);
  router.get('/api/ad/detail', controller.api.ad.detail);
  router.post('/api/ad/create', auth, controller.api.ad.create);
  router.get('/api/ad/delete', auth, controller.api.ad.delete);
  router.post('/api/ad/update', auth, controller.api.ad.update);
  router.post('/api/upload', auth, controller.api.ad.upload);

  // 留言管理
  router.get('/api/message/list', controller.api.message.list);
  router.get('/api/message/search', controller.api.message.search);
  router.get('/api/message/detail', controller.api.message.detail);
  router.post('/api/message/create', auth, controller.api.message.create);
  router.get('/api/message/delete', auth, controller.api.message.delete);
  router.post('/api/message/update', auth, controller.api.message.update);

};
