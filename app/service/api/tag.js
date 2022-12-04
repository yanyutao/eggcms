'use strict';
const BaseService = require('./base');

class TagService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'tag';
  }

  // 新增
  async create({
    name,
    path,
  }) {
    const {
      app,
    } = this;
    const result = await app.mysql.insert(`${this.model}`, {
      name,
      path,
    });

    const affectedRows = result.affectedRows;
    return affectedRows > 0 ? 'success' : 'fail';
  }

  async has(path) {
    const {
      app,
    } = this;
    const result = await app.mysql.get(`${this.model}`, { path });
    return Object.keys(result).length > 0;
  }

  // 删除tag ,需要删除article_map_tag.js 里面的tid
  async delete(id) {

    const {
      app,
    } = this;
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {

      const has = await conn.query(`SELECT tid FROM article_map_tag WHERE tid = ${id}`);
      if (has.length > 0) {
        return false;
      }
      const res = await conn.delete(`${this.model}`, {
        id,
      });
      await conn.commit(); // 提交事务
      return res.affectedRows > 0 ? 'success' : 'fail';
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }
  }

  // 修改
  async update({
    id,
    name,
    path,
  }) {
    const {
      app,
    } = this;

    try {

      const result = await app.mysql.update(`${this.model}`, {
        id,
        name,
        path,
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
          ['id', 'desc'],
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
      const sql_list = `SELECT p.id,p.name,p.path FROM ${this.model} p WHERE p.name LIKE '%${key}%' ORDER BY id DESC LIMIT ${offset},${parseInt(pageSize)}`;
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
      console.error(err);
      await conn.rollback();
      throw err;
    }

  }

}

module.exports = TagService;
