'use strict';

const BaseController = require('./base');
const dayjs = require('dayjs');
class AdminController extends BaseController {
  constructor(...args) {
    super(...args);
    this.model = 'admin';

  }

  // 登录
  async login() {
    try {
      const { ctx, app, service } = this;
      let { username, password } = ctx.request.body;
      password = ctx.helper.md5(password + app.config.md5.key);
      const res = await service.api[this.model].find(username, password);
      if (res) {
        const { id, status } = res;
        // 设置token data, key, time username, uid
        const token = this.ctx.helper.setToken({ uid: id, username },
          this.config.token.KEY,
          this.config.token.TIME);
        // this.ctx.cookies.set('token', token, {
        //   httpOnly: false,
        // });
        const data = { id, status, username, token };
        this.success(data);
      } else {
        this.fail('用户名或密码错误');
      }
    } catch (error) {
      this.fail(error);
    }
  }

  // 增
  async create() {
    try {
      const { ctx, app, service } = this;
      const body = ctx.request.body;
      body.password = ctx.helper.md5(body.password + app.config.md5.key);
      body.createdAt = dayjs(body.createdAt).format('YYYY-MM-DD HH:mm:ss');
      body.updatedAt = dayjs(body.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      const data = await service[this.config.apiService][this.model].create(body);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }

  // 删除
  async delete() {
    try {
      const { ctx, service } = this;
      const id = ctx.query.id;
      const data = await service[this.config.apiService][this.model].delete(id);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }

  // 改
  async update() {
    try {
      const { ctx, app, service } = this;
      const body = ctx.request.body;
      body.password = ctx.helper.md5(body.password + app.config.md5.key);
      body.createdAt = dayjs(body.createdAt).format('YYYY-MM-DD HH:mm:ss');
      body.updatedAt = dayjs(body.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      const data = await service[this.config.apiService][this.model].update({ ...body });
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }


  // 查
  async detail() {
    try {
      const { ctx, service } = this;
      const id = ctx.query.id;
      const data = await service[this.config.apiService][this.model].detail(id);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }


  // 搜索
  async search() {
    try {
      const { ctx, service } = this;
      const cur = ctx.query.cur;
      const key = ctx.query.keyword;
      const pageSize = 10;
      const data = await service[this.config.apiService][this.model].search(key, cur, pageSize);
      data.list.forEach(ele => {
        ele.createdAt = dayjs(ele.createdAt).format('YYYY-MM-DD HH:MM');
      });
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }

  // 列表
  async list() {
    try {
      const { ctx, service } = this;
      const cur = ctx.query.cur;
      const pageSize = 10;
      const data = await service[this.config.apiService][this.model].list(cur, pageSize);
      data.list.forEach(ele => {
        ele.createdAt = dayjs(ele.createdAt).format('YYYY-MM-DD HH:MM');
      });
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }


}


module.exports = AdminController;
