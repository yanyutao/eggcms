'use strict';
const BaseController = require('./base');
class ModelController extends BaseController {

  constructor(...args) {
    super(...args);
    this.model = 'model';
  }

  // 增
  async create() {
    try {
      const { ctx, service } = this;
      const body = ctx.request.body;

      const has = await service[this.config.apiService][this.model].findByName(body.model_name, body.table_name);
      if (has.length > 0) {
        this.fail({ msg: '模型命名已重复' });
        return;
      }
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
      const body = ctx.request.body;
      const data = await service[this.config.apiService][this.model].delete(body.id, body.table_name);
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

  // 是否被使用
  async hasUse() {
    try {
      const { ctx, service } = this;
      const id = ctx.query.id;
      const data = await service[this.config.apiService][this.model].hasUse(id);
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
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }
}

module.exports = ModelController;
