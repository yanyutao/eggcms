'use strict';
module.exports = (options, app) => {
  return async function(ctx, next) {
    const userAgent = ctx.get('user-agent');
    // 放入中间件
    if (!ctx.helper.pc(userAgent)) {
      ctx.app.locals.views = 'h5';
    } else {
      ctx.app.locals.views = 'pc';
    }
    await next();
  };
};
