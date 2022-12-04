'use strict';
const BaseService = require('./base');
const path = require('path');
async function getImgsByPageId(id, conn, arr, ctx) {
  const imgStr = ` SELECT content FROM page WHERE id=${id}`;
  const img = await conn.query(imgStr);
  if (img.length > 0) {
    const contImgArr = ctx.helper.filterImgFromStr(img[0].content);
    for (let i = 0; i < contImgArr.length; i++) {
      arr.push(contImgArr[i]);
    }
  }
}
class PageService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'page';
  }

  // 新增
  async create({
    cid,
    title,
    seo_title,
    seo_keywords,
    seo_description,
    source,
    author,
    content,
    status,
    pv,
    createdAt,
  }) {
    const {
      app,
    } = this;
    try {
    
      const result = await app.mysql.insert(`${this.model}`, {
        cid,
        title,
        seo_title,
        seo_keywords,
        seo_description,
        source,
        author,
        content,
        status,
        pv,
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
      app, ctx,
    } = this;

    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      const ids = id.split(',');
      let arr = [];
      for (let i = 0, item; i < ids.length; i++) {
        item = ids[i];
        // 获取批量页面缩略图和内容图片路径
        await getImgsByPageId(item, conn, arr, ctx);
      }
      // 过滤外链中的图片
      arr = arr.filter(item => {
        return item.includes('public/uploads');
      });

      // 批量删除页面图片
      if (arr.length > 0) {
        for (let i = 0, item; i < arr.length; i++) {
          item = arr[i];
          ctx.helper.delImg(path.join(__dirname, '../../' + item));
        }
      }

      // 批量删除页面
      const delPageStr = `DELETE FROM ${this.model} WHERE id IN(${id})`;
      const delPage = await conn.query(delPageStr);

      const affectedRows = delPage.affectedRows;
      await conn.commit(); // 提交事务
      return affectedRows > 0 ? 'success' : 'fail';
    } catch (err) {
      console.error(err);
       await conn.rollback(); 
throw err; 
    }

  }


  // 修改
  async update({
    id,
    cid,
    title,
    seo_title,
    seo_keywords,
    seo_description,
    source,
    author,
    content,
    status,
    pv,
    updatedAt,
  }) {
    const {
      app,
    } = this;
    try {
    
      const result = await app.mysql.update(`${this.model}`, {
        cid,
        title,
        seo_title,
        seo_keywords,
        seo_description,
        source,
        author,
        content,
        status,
        pv,
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

  // 文章内容
  async article(cid) {
    const {
      ctx,
      app,
    } = this;
    try {
    
      const sql = 'SELECT * FROM page WHERE cid=? ORDER BY id LIMIT 1';
      const data = await this.app.mysql.query(sql, [ cid ]);
      return data[0];
    } catch (error) {
     console.error(error)
    }
  }


  // 增加计数器
  async count(id) {
    const { app } = this;
    try {
    
      const sql = `UPDATE page SET pv=pv+1 WHERE id=${id} LIMIT 1`;
      const result = await app.mysql.query(sql);
      const affectedRows = result.affectedRows;
      return affectedRows > 0 ? 'success' : 'fail';
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
      const sql = `SELECT COUNT(*) as count FROM  page p LEFT JOIN category c ON p.cid=c.id WHERE p.title LIKE '%${key}%'`;
      const total = await conn.query(sql);

      // 翻页
      const offset = parseInt((cur - 1) * pageSize);
      const sql_list = `SELECT p.id,p.title,p.cid,p.pv,p.updatedAt,p.status,c.name FROM ${this.model} p LEFT JOIN category c ON p.cid=c.id WHERE p.title LIKE '%${key}%' LIMIT ${offset},${parseInt(pageSize)}`;
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

module.exports = PageService;
