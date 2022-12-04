'use strict';
const BaseService = require('./base');

class AdminService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'admin';
  }

  // 登录
  async find(username, password) {
    const { app } = this;
    try {
      const result = await app.mysql.get(`${this.model}`, { username, password });
      return result;
    } catch (error) {
      console.error(error)
    }
  }

  // 增加
  async create(body) {
    const { app } = this;
    try {
      const result = await app.mysql.insert(`${this.model}`, { ...body });
      const affectedRows = result.affectedRows;
      return affectedRows > 0 ? 'success' : 'fail';
    } catch (error) {
      console.error(error)
    }
  }

  // 删
  async delete(id) {
    const {
      app,
    } = this;
    try {
      const result = await app.mysql.delete(`${this.model}`, {
        id,
      });
      const affectedRows = result.affectedRows;
      return affectedRows > 0 ? 'success' : 'fail';
    } catch (error) {
      console.error(error)
    }

  }

  // 修改
  async update({
    id,
    password,
    createdAt,
    updatedAt,
    status,
  }) {
    const {
      app,
    } = this;
    try {
      const result = await app.mysql.update(`${this.model}`, {
        password,
        createdAt,
        updatedAt,
        status,
      }, {
        where: {
          id,
        },
      });
      const affectedRows = result.affectedRows;
      return affectedRows > 0 ? 'success' : 'fail';
    } catch (error) {
      console.error(error)
    }

  }

  // 列表
  async list(current = 1, pageSize = 10) {
    const {
      app,
    } = this;
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      // 查询个数
      const sql = `SELECT COUNT(id) as count FROM ${this.model}`;
      const total = await conn.query(sql);
      const offset = parseInt((current - 1) * pageSize);
      const list = await conn.select(`${this.model}`, {
        orders: [
          ['id', 'desc'],
        ],
        offset,
        limit: parseInt(pageSize),
      });

      await conn.commit(); // 提交事务
      return {
        count: total[0].count,
        total: Math.ceil(total[0].count / pageSize),
        current: +current,
        list,
      };
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }
  }


  // 查
  async detail() {
    const {
      ctx,
      app,
    } = this;
    try {
      const id = ctx.query.id;
      const data = await app.mysql.select(`${this.model}`, {
        columns: ['id', 'username', 'createdAt', 'updatedAt', 'status'],
        where: { id },
      });
      return data[0];
    } catch (error) {
      console.log(error)
    }
  }

  // 搜索
  async search(key = '', cur = 1, pageSize = 10) {
    const {
      app,
    } = this;
    // 初始化事务
    const conn = await app.mysql.beginTransaction();
    try {

      // 查询个数
      const sql = `SELECT COUNT(id) as count FROM ${this.model} p  WHERE p.name LIKE '%${key}%'`;
      const total = await conn.query(sql);

      // 翻页
      const offset = parseInt((cur - 1) * pageSize);
      const sql_list = `SELECT p.id,p.name,p.mark FROM ${this.model} p WHERE p.name LIKE '%${key}%' ORDER BY id DESC LIMIT ${offset},${parseInt(pageSize)}`;
      const list = await conn.query(sql_list);

      // 提交事务
      await conn.commit();

      return {
        count: total[0].count,
        total: Math.ceil(total[0].count / pageSize),
        current: +cur,
        list,
      };
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }
  }


}

module.exports = AdminService;
