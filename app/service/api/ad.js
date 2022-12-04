'use strict';
const BaseService = require('./base');
const path = require('path');

class AdService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'ad';
  }

  // 增
  async create(body) {
    const {
      app,
    } = this;
    try {
      const result = await app.mysql.insert(`${this.model}`, body);
      const affectedRows = result.affectedRows;
      return affectedRows > 0 ? 'success' : 'fail';
    } catch (error) {
      console.error(error)
    }
  }

  // 删
  async delete(id) {
    const {
      app, ctx,
    } = this;
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      // 删除图片
      const imgStr = ` SELECT imgUrl FROM ad WHERE id=${id}`;
      const img = await conn.query(imgStr);
      const imgUrl = img[0].imgUrl;

      if (imgUrl) {
        ctx.helper.delImg(path.join(__dirname, '../../' + imgUrl));
      }
      // 删除广告
      const delAdStr = `DELETE FROM ${this.model} WHERE id IN(${id})`;
      const delAd = await conn.query(delAdStr);

      const affectedRows = delAd.affectedRows;
      await conn.commit(); // 提交事务
      return affectedRows > 0 ? 'success' : 'fail';
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }

  }

  // 改
  async update({
    id,
    title,
    mark,
    imgUrl,
    link,
    platform,
    position,
    status,
    createdAt,
    updatedAt,
  }) {
    const {
      app,
    } = this;
    try {
      const result = await app.mysql.update(`${this.model}`, {
        id,
        title,
        mark,
        imgUrl,
        link,
        platform,
        position,
        status,
        createdAt,
        updatedAt,
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
    try {
      const id = ctx.query.id;
      const data = await app.mysql.get(`${this.model}`, {
        id,
      });
      return data;
    } catch (error) {
      console.error(error)
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
      const sql = `SELECT COUNT(id) as count FROM ${this.model} a  WHERE a.title LIKE '%${key}%'`;
      const total = await conn.query(sql);

      // 翻页
      const offset = parseInt((cur - 1) * pageSize);
      const sql_list = `SELECT a.id,a.title,a.mark,a.imgUrl,a.link,a.platform,a.position,a.status,a.createdAt,a.updatedAt FROM ${this.model} a WHERE a.title LIKE '%${key}%' ORDER BY id DESC LIMIT ${offset},${parseInt(pageSize)}`;
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

module.exports = AdService;
