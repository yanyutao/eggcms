'use strict';

const BaseController = require('./base');
class TokenController extends BaseController {
  constructor(...args) {
    super(...args);
    this.model = 'token';
  }

  // 更新token时间
  async update() {
    try {
      const { ctx } = this;
      const username = ctx.locals.username;
      const uid = ctx.locals.uid;
      const token = ctx.helper.setToken({ username, uid },
        this.config.token.KEY,
        this.config.token.TIME);
      this.success({ token });
    } catch (error) {
      this.fail(error);
    }
  }

  // 校验token是否正确
  async check() {
    try {
      const { ctx } = this;
      const token = ctx.query.token;
      const res = await ctx.helper.getToken(token, this.config.token.KEY);
      this.success({ ...res });
    } catch (error) {
      this.fail(error);
    }
  }


}

module.exports = TokenController;
