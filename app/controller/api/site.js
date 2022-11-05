'use strict';

const BaseController = require('./base');
const path = require('path');
class SiteController extends BaseController {
  constructor(...args) {
    super(...args);
    this.model = 'site';
  }

  // 查
  async find() {
    try {
      const { ctx, service } = this;

      const data = await service[this.config.apiService][this.model].find();
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }


  // 增
  async create() {
    try {
      const { ctx, service } = this;
      const data = await service[this.config.apiService][this.model].create({ ...ctx.request.body });
      this.success({ data });
    } catch (error) {
      this.fail(error);
    }
  }

  // 删除
  async delete() {
    try {
      const { ctx, service } = this;
      const id = ctx.body.id;
      const data = await service[this.config.apiService][this.model].delete(id);
      this.success({ data });
    } catch (error) {
      this.fail(error);
    }
  }

  // 改
  async updateInfo() {
    try {
      const { ctx, service } = this;
      const data = await service[this.config.apiService][this.model].updateInfo({ ...ctx.request.body });
      this.success({ data });
    } catch (error) {
      this.fail(error);
    }
  }

  async updateSeo() {
    try {
      const { ctx, service } = this;
      const data = await service[this.config.apiService][this.model].updateSeo({ ...ctx.request.body });
      this.success({ data });
    } catch (error) {
      this.fail(error);
    }
  }

  // 查
  async findId() {
    try {
      const { ctx, service } = this;
      const id = ctx.query.id;
      const data = await service[this.config.apiService][this.model].find(id);
      this.success({ data });
    } catch (error) {
      this.fail(error);
    }
  }

  // 获取磁盘信息
  async runEnv() {
    try {
      this.success({ dirname: path.join(__dirname, '../../../../') });
    } catch (error) {
      this.fail(error);
    }
  }

}

module.exports = SiteController;
