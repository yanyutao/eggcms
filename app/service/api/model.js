'use strict';
const BaseService = require('./base');

class ModelService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'model';
  }

  // 增
  async create(body) {
    const {
      app,
    } = this;
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      const { model_name, table_name, status } = body;
      // 新建表
      const sql_create = `CREATE TABLE ${table_name} (aid int(11) NOT NULL) ENGINE=MyISAM DEFAULT CHARSET=utf8`;
      const createTableStatus = await conn.query(sql_create);
      // 新增内容
      const sql_insert = `INSERT INTO ${this.model} (model_name,table_name,status) VALUES(?,?,?)`;
      const result = await conn.query(sql_insert, [model_name, table_name, status]);
      const insertStatus = result.affectedRows === 1;

      await conn.commit(); // 提交事务
      return {
        insertStatus,
        createTableStatus,
      };
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }
  }

  async hasUse(id) {
    const {
      app,
    } = this;
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      // 新增内容
      const hasStr = `SELECT COUNT(*) as count FROM  article a LEFT JOIN category c ON c.mid=${id} WHERE a.cid=c.id LIMIT 0,1`;
      const has = await conn.query(hasStr);
      await conn.commit(); // 提交事务
      return {
        has,
      };
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }
  }

  // 删
  async delete(id, table_name) {
    const {
      app,
    } = this;
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      // 删除模型
      const result = await conn.delete(`${this.model}`, {
        id,
      });
      // 删除模型下对应得字段数据
      const delField = await conn.delete('field', {
        model_id: id,
      });
      // 删除模型对应的表
      const delTable = await conn.query(`drop table ${table_name}`);
      await conn.commit(); // 提交事务
      return {
        delModel: result.affectedRows === 1,
        delField: delField.affectedRows === 1,
        delTable: delTable.affectedRows === 1,
      };
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }

  }

  // 改
  async update(params) {
    const {
      app,
    } = this;
    const { id, old_table_name, table_name, model_name, status } = params;
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      const renameTable = await conn.query(`alter table ${old_table_name} rename to ${table_name}`);
      const result = await conn.update(`${this.model}`, { table_name, model_name, status }, {
        where: { id },
      });
      await conn.commit(); // 提交事务
      return {
        renameStatus: renameTable.affectedRows === 1,
        updateStatus: result.affectedRows === 1,
      };

    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }

  }


  // 查询是否已存在模型名称
  async findByName(model_name, table_name) {
    const { app } = this;
    const result = await app.mysql.query('SELECT model_name,table_name from model WHERE model_name=? or table_name=? LIMIT 0,1', [model_name, table_name]);
    return result;
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
        columns: ['id', 'model_name', 'table_name', 'status'],
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
  async detail(id) {
    const {
      ctx,
      app,
    } = this;
    const ids = id ? id : ctx.query.id;
    const data = await app.mysql.get(`${this.model}`, {
      id: ids,
    });
    return data;
  }


}

module.exports = ModelService;
