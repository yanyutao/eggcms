'use strict';
const BaseService = require('./base');

class FieldService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'field';
  }

  // 增
  async create(body) {
    const {
      app,
    } = this;
    const conn = await app.mysql.beginTransaction(); // 初始化事务

    try {
      // 新增字的同时需要新增表
      const { model_id, field_cname, field_ename, field_type, field_values, field_default, field_sort } = body;

      // 查询模块名称
      let table_name = await conn.query('SELECT table_name FROM model WHERE id=?', [model_id]);
      table_name = table_name[0].table_name;

      const result = await app.mysql.insert(`${this.model}`, { model_id, field_cname, field_ename, field_type, field_values, field_default, field_sort });
      const affectedRows = result.affectedRows;
      let sql = '';
      if (affectedRows > 0) {
        // 1单行文本（varchar）2.多行文本 text 3.下拉菜单 text 4.单选 text 5.多选 6.时间和日期
        if (field_type === '1') {
          sql = 'varchar(100) not null default \'\'';
        }
        if (field_type === '2') {
          sql = 'varchar(250) not null default \'\'';
        }
        if (field_type === '3') {
          sql = 'varchar(100) not null default \'\'';
        }
        if (field_type === '4') {
          sql = 'varchar(50) not null default \'\'';
        }
        if (field_type === '5') {
          sql = 'varchar(50) not null default \'\'';
        }
        if (field_type === '6') {
          sql = 'datetime default null';
        }

        const res = await app.mysql.query(`alter table ${table_name} add ${field_ename} ${sql}`);
        return res.serverStatus === 2 ? 'success' : 'fail';
      }

      await conn.commit(); // 提交事务
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }


  }

  // 删 先删除field数据表中的数据 在删除对应表中的字段名称 2020-10-08
  // "alter table ${table_name} drop column ${fieldName}"
  // https://study.163.com/course/courseLearn.htm?courseId=1003803023#/learn/video?lessonId=1004585871&courseId=1003803023


  async delete(id, table_name) {
    const {
      app,
    } = this;
    const conn = await app.mysql.beginTransaction(); // 初始化事务

    try {

      // 查询需要删除的字段
      const field = await conn.query('SELECT model_id,field_ename FROM field WHERE id=?', [id]);
      const { field_ename, model_id } = field[0];
      // 查询模型表名
      const table = await conn.query('SELECT table_name FROM model WHERE id=?', [model_id]);
      table_name = table[0].table_name;
      // 删除数据
      const result = await app.mysql.delete(`${this.model}`, {
        id,
      });
      const affectedRows = result.affectedRows;
      // 删除对应模型表中的字段
      if (affectedRows > 0) {
        const res = await app.mysql.query(`alter table ${table_name} drop column ${field_ename}`);
        return res.affectedRows > 0 ? 'success' : 'fail';
      }
      await conn.commit(); // 提交事务
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }
  }


  // 改
  async update({
    id,
    model_id,
    field_cname,
    field_ename,
    field_type,
    field_values,
    field_default,
    field_sort,
  }) {
    const {
      app,
    } = this;
    try {

      const result = await app.mysql.update(`${this.model}`, {
        model_id,
        field_cname,
        field_ename,
        field_type,
        field_values,
        field_default,
        field_sort,
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

  // 查询是否存在重复字段名

  async findByName(field_cname, field_ename) {
    const { app } = this;
    try {

      const result = await app.mysql.query('SELECT field_cname,field_ename from field WHERE field_cname=? or field_ename=? LIMIT 0,1', [field_cname, field_ename]);
      return result;
    } catch (error) {
      console.error(error)
    }
  }

  // 文章列表
  async list(model_id, current = 1, pageSize = 10) {
    const {
      app,
    } = this;
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      // 查询个数
      const sql = `SELECT COUNT(id) as count FROM ${this.model}`;
      const total = await conn.query(sql);
      // 列表
      const offset = parseInt((current - 1) * pageSize);
      const list = await conn.select(`${this.model}`, {
        where: { model_id },
        columns: ['id', 'field_cname', 'field_ename', 'field_sort'],
        orders: [
          ['id', 'desc'],
        ],
        offset,
        limit: parseInt(pageSize),
      });

      // 查询模块名称
      const model = await conn.query('SELECT model_name,table_name FROM model WHERE id=?', [model_id]);

      await conn.commit(); // 提交事务

      return {
        count: total[0].count,
        total: Math.ceil(total[0].count / pageSize),
        current: Number(current),
        model: model[0],
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
    try {

      const ids = id ? id : ctx.query.id;
      const data = await app.mysql.get(`${this.model}`, {
        id: ids,
      });
      return data;
    } catch (error) {
      console.error(error)
    }
  }


}

module.exports = FieldService;
