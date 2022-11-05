'use strict';

const auth = (options, app) => {
  return async function(ctx, next) {
    const token = ctx.headers.auth;
    // code 0-无 1-超时 2-假得
    if (token) {
      try {
        // 校验token
        await ctx.helper.getToken(token, options.token.KEY);
        await next();
        // if (Object.keys(res).length > 0) {
        //   const { username, uid } = res;
        //   // 通过验证
        //   ctx.locals.username = username;
        //   ctx.locals.uid = uid;
        //   // 更新token 之后需要重新设置
        //   const token = ctx.helper.setToken({ username, uid },
        //     options.token.KEY,
        //     options.token.TIME);
        //   // 设置cookie缓存
        //   ctx.cookies.set('token', token, {
        //     httpOnly: false,
        //   });
        // }
      } catch (error) {
        ctx.body = {
          code: 0,
          msg: error,
        };
      }
    } else {
      // token缺失
      ctx.body = {
        code: 0,
        msg: 'token缺失',
      };
    }
  };
};

module.exports = auth;
