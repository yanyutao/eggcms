'use strict';

const Service = require('egg').Service;

class BaseService extends Service {

  // 列表
  async list(pageNum, pageSize) {
    const { app } = this;
    const offset = parseInt((pageNum - 1) * pageSize);
    const result = await app.mysql.select(`${this.model}`, {
      orders: [[ 'id', 'desc' ]],
      offset,
      limit: parseInt(pageSize),
    });
    return result;
  }

  // 新增
  async create(body) {
    const { app } = this;
    const result = await app.mysql.insert(`${this.model}`, body);
    const affectedRows = result.affectedRows;
    return affectedRows > 0 ? 'success' : 'fail';
  }

  // 更新
  async update(body) {
    const { app } = this;
    const result = await app.mysql.update(`${this.model}`, body);
    const affectedRows = result.affectedRows;
    return affectedRows > 0 ? 'success' : 'fail';
  }

  // 删除
  async destroy(id) {
    const { app } = this;
    const result = await app.mysql.delete(`${this.model}`, { id });
    const affectedRows = result.affectedRows;
    return affectedRows > 0 ? 'success' : 'fail';
  }
}

module.exports = BaseService;
