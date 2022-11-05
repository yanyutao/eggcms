'use strict';
const BaseController = require('./base');
const dayjs = require('dayjs');
class TagController extends BaseController {

  constructor(...args) {
    super(...args);
    this.model = 'tag';
  }

  // 增
  async create() {
    try {
      const { ctx, service } = this;
      const body = ctx.request.body;
      body.content = ctx.helper.filterBody(body.content);
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
      if (data) {
        this.success(data);
      } else {
        this.fail({ msg: '存在引用，不能删' });
      }

    } catch (error) {
      this.fail(error);
    }
  }

  // 改
  async update() {
    try {
      const { ctx, service } = this;
      const data = await service[this.config.apiService][this.model].update({ ...ctx.request.body });
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


  // 列表
  async list() {
    try {
      const { ctx, service } = this;
      const cur = ctx.query.cur;
      const pageSize = 50;
      const data = await service[this.config.apiService][this.model].list(cur, pageSize);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }


  async has() {
    try {
      const { ctx, service } = this;
      const path = ctx.query.path;
      const data = await service[this.config.apiService][this.model].has(path);
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

      const pageSize = ctx.query.pageSize || 10;
      const data = await service[this.config.apiService][this.model].search(key, cur, pageSize);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }

}

module.exports = TagController;
