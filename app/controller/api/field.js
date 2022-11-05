'use strict';
const BaseController = require('./base');
class FieldController extends BaseController {

  constructor(...args) {
    super(...args);
    this.model = 'field';
  }

  // 增
  async create() {
    try {
      const { ctx, service } = this;
      const body = ctx.request.body;
      const has = await service[this.config.apiService][this.model].findByName(body.field_cname, body.field_ename);
      if (has.length > 0) {
        this.fail({ msg: '字段命名已重复' });
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

  // 列表
  async list() {
    try {
      const { ctx, service } = this;
      const cur = ctx.query.cur;
      const model_id = ctx.query.model_id;
      const pageSize = 10;
      const data = await service[this.config.apiService][this.model].list(model_id, cur, pageSize);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }
}

module.exports = FieldController;
