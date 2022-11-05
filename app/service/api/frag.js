'use strict';
const BaseService = require('./base');

class FragService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'frag';
  }

  // 新增
  async create({
    name,
    mark,
    createdAt,
    content,
  }) {
    const {
      app,
    } = this;
    const result = await app.mysql.insert(`${this.model}`, {
      name,
      mark,
      createdAt,
      content,
    });

    const affectedRows = result.affectedRows;
    return affectedRows > 0 ? 'success' : 'fail';
  }

  // 删
  async delete(id) {
    const {
      app,
    } = this;
    const result = await app.mysql.delete(`${this.model}`, {
      id,
    });
    const affectedRows = result.affectedRows;
    return affectedRows > 0 ? 'success' : 'fail';
  }


  // 修改
  async update({
    id,
    content,
    createdAt,
    mark,
    name,
  }) {
    const {
      app,
    } = this;
    const result = await app.mysql.update(`${this.model}`, {
      id,
      content,
      createdAt,
      mark,
      name,
    }, {
      where: {
        id,
      },
    });
    const affectedRows = result.affectedRows;
    return affectedRows > 0 ? 'success' : 'fail';
  }


  // 文章列表
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
          [ 'id', 'desc' ],
        ],
        offset,
        limit: parseInt(pageSize),
      });

      await conn.commit(); // 提交事务
      return {
        count: total[0].count,
        total: Math.ceil(total[0].count / pageSize),
        current: Number(current),
        list,
      };
    } catch (err) {
      // error, rollback
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      console.error(err);
    }
  }


  // 查
  async detail() {
    const {
      ctx,
      app,
    } = this;
    const id = ctx.query.id;
    const data = await app.mysql.get(`${this.model}`, {
      id,
    });
    return data;
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
        current: Number(cur),
        list,
      };
    } catch (err) {
      // 异常后回滚
      await conn.rollback();
      console.error(err);
    }

  }

}

module.exports = FragService;
