'use strict';
const BaseService = require('./base');

class MessageService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'message';
  }

  // 新增
  async create({
    name,
    tel,
    wx,
    content,
    createdAt,
  }) {
    const {
      app,
    } = this;
    try {
    
      const result = await app.mysql.insert(`${this.model}`, {
        name,
        tel,
        wx,
        content,
        createdAt,
      });
  
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
    name,
    tel,
    wx,
    content,
    createdAt,
  }) {
    const {
      app,
    } = this;

    try {
    
      const result = await app.mysql.update(`${this.model}`, {
        id,
        name,
        tel,
        wx,
        content,
        createdAt,
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
      console.error(err);
       await conn.rollback(); 
throw err; 
    }

  }

}

module.exports = MessageService;
