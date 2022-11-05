'use strict';
const BaseController = require('./base');

class CategoryController extends BaseController {

  constructor(...args) {
    super(...args);
    this.model = 'category';
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
      const data = await service[this.config.apiService][this.model].update({ ...ctx.request.body });
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
  async findId() {
    try {
      const { ctx, service } = this;
      const id = ctx.query.id;
      const data = await service[this.config.apiService][this.model].findId(id);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }

  // 查子栏目
  async findSubId() {
    try {
      const { ctx, service } = this;
      const id = ctx.query.id;
      const data = await service[this.config.apiService][this.model].findSubId(id);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }

  // 搜索栏目
  async search() {
    try {
      const { ctx, service } = this;
      const q = ctx.query.q;
      const data = await service[this.config.apiService][this.model].search(q);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }

}

module.exports = CategoryController;
