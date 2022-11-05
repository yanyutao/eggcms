'use strict';
const BaseController = require('./base');
const dayjs = require('dayjs');
class MessageController extends BaseController {

  constructor(...args) {
    super(...args);
    this.model = 'message';
  }

  // 增
  async create() {
    try {
      const { ctx, service } = this;
      const body = ctx.request.body;
      body.createdAt = dayjs(body.createdAt).format('YYYY-MM-DD HH:mm:ss');
      const data = await service[this.config.apiService][this.model].create({ ...body });
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
      const { ctx, service } = this;
      const body = ctx.request.body;
      body.createdAt = dayjs(body.createdAt).format('YYYY-MM-DD HH:mm:ss');
      const data = await service[this.config.apiService][this.model].update({ ...body });
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }

  // 查
  async find() {
    try {
      const { service } = this;
      const data = await service[this.config.apiService][this.model].find();
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

module.exports = MessageController;
