'use strict';
module.exports = (options, app) => {
  return async function init(ctx, next) {
    if ('site' in ctx.app.locals) {
      await next();
      return;
    }
    // 站点
    const site = await ctx.service[app.config.apiService].site.find();
    // 导航
    const category = await ctx.service[app.config.template].home.category();
    const nav = ctx.helper.tree(category);
    // 友情链接
    const friendlink = await ctx.service[app.config.apiService].friendlink.list();
    ctx.app.locals = { site, nav, category, friendlink };
    ctx.app.locals.base_url = '/public/template/' + app.config.template;
    await next();
  };
};
