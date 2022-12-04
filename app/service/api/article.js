'use strict';
const BaseService = require('./base');
const path = require('path');
async function getImgsByArticleId(id, conn, arr, ctx) {
  const imgStr = ` SELECT img,content FROM article WHERE id=${id}`;
  const img = await conn.query(imgStr);
  if (img.length > 0) {
    if (img[0].img) {
      arr.push(img[0].img);
    }
    const contImgArr = ctx.helper.filterImgFromStr(img[0].content);
    for (let i = 0; i < contImgArr.length; i++) {
      arr.push(contImgArr[i]);
    }
  }
}
class ArticleService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'article';
  }

  // 增
  async create(body) {
    const {
      app,
    } = this;
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      // 插入基本文章
      const result = await conn.insert(`${this.model}`, body.defaultParams);
      const affectedRows = result.affectedRows;
      let res,
        mapTag;
      if (affectedRows > 0) {
        // 获取最后一个文章id和栏目id
        const lastStr = `SELECT id,cid FROM ${this.model} ORDER BY id DESC LIMIT 1`;
        const lastId = await conn.query(lastStr);
        const { id, cid } = lastId[0];
        // 通过栏目id查找模型id
        const modIdStr = `SELECT mid FROM category WHERE id=${cid} LIMIT 0,1`;
        const modId = await conn.query(modIdStr);
        // 通过模型查找表名
        const tableNameStr = `SELECT table_name FROM model WHERE id=${modId[0].mid} LIMIT 0,1`;
        const tableName = await conn.query(tableNameStr);
        // 新增模型文章
        if (tableName.length > 0) {
          const fieldParams = { ...body.fieldParams, aid: id };
          res = await conn.insert(`${tableName[0].table_name}`, fieldParams);
        }
        // 新增文章和标签关联
        const tags = body.defaultParams.tag_id.split(',').map(item => Number(item));
        const tagsql = [];
        tags.forEach(item => {
          tagsql.push(`(${id},${item})`);
        });
        if (res && res.affectedRows) {
          mapTag = await conn.query('INSERT INTO article_map_tag(aid,tid) VALUES ' + tagsql.join(','));
        }
      }
      await conn.commit(); // 提交事务

      if (mapTag && mapTag.affectedRows) {
        return mapTag.affectedRows > 0 ? 'success' : 'fail';
      }

      return affectedRows > 0 ? 'success' : 'fail';
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
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
      // 删除文章图片
      let arr = [];
      // 批量删除模型文章
      for (let i = 0, item; i < ids.length; i++) {
        item = ids[i];
        // 通过文章id,找栏目id
        const categoryStr = `SELECT cid FROM article WHERE id=${item} LIMIT 0,1`;
        const category = await conn.query(categoryStr);
        // 通过栏目id查找模型id
        if (category.length > 0) {
          const modIdStr = `SELECT mid FROM category WHERE id=${category[0].cid} LIMIT 0,1`;
          const modId = await conn.query(modIdStr);

          // 通过模型查找表名
          if (modId.length > 0) {
            const tableNameStr = `SELECT table_name FROM model WHERE id=${modId[0].mid} LIMIT 0,1`;
            const tableName = await conn.query(tableNameStr);
            if (tableName.length > 0) {
              // 删除模型文章
              const delModelStr = `DELETE FROM ${tableName[0].table_name} WHERE aid IN(${item})`;
              await conn.query(delModelStr);
            }
          }
        }

        // 获取批量文章缩略图和内容图片路径
        await getImgsByArticleId(item, conn, arr, ctx);
      }

      // 过滤外链中的图片
      arr = arr.filter(item => {
        return item.includes('public/uploads');
      });

      // 批量删除文章缩略图和文章图片
      if (arr.length > 0) {
        for (let i = 0, item; i < arr.length; i++) {
          item = arr[i];
          ctx.helper.delImg(path.join(__dirname, '../../' + item));
        }
      }

      // 批量删除文章
      const delArticleStr = `DELETE FROM ${this.model} WHERE id IN(${id})`;
      const delArticle = await conn.query(delArticleStr);

      // 删除关联的 tag
      const delMapTagStr = `DELETE FROM article_map_tag WHERE aid IN(${id})`;
      await conn.query(delMapTagStr);

      const affectedRows = delArticle.affectedRows;
      await conn.commit(); // 提交事务
      return affectedRows > 0 ? 'success' : 'fail';
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }
  }

  // 改
  async update(body) {
    const {
      app,
    } = this;

    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      const { cid,
        sub_cid,
        title,
        short_title,
        tag_id,
        attr,
        seo_title,
        seo_keywords,
        seo_description,
        source,
        author,
        description,
        img,
        content,
        status,
        pv,
        link,
        createdAt,
        updatedAt, id, field } = body;
      delete field.aid;

      // 通过栏目id查找模型id
      const modIdStr = `SELECT mid FROM category WHERE id=${cid} LIMIT 0,1`;
      const modId = await conn.query(modIdStr);

      // 通过模型查找表名
      const tableNameStr = `SELECT table_name FROM model WHERE id=${modId[0].mid} LIMIT 0,1`;
      const tableName = await conn.query(tableNameStr);
      if (tableName.length > 0) {
        await conn.update(`${tableName[0].table_name}`, {
          ...field,
        }, {
          where: {
            aid: id,
          },
        });
      }

      const result = await conn.update(`${this.model}`, {
        cid,
        sub_cid,
        title,
        short_title,
        tag_id,
        attr,
        seo_title,
        seo_keywords,
        seo_description,
        source,
        author,
        description,
        img,
        content,
        status,
        pv,
        link,
        createdAt,
        updatedAt,
      }, {
        where: {
          id,
        },
      });
      const affectedRows = result.affectedRows;


      // 修改标签，要先全部删除关联的tag，然后再添加，因为修改标签有删除，新增等方式
      const delMapTagStr = `DELETE FROM article_map_tag WHERE aid IN(${id})`;
      await conn.query(delMapTagStr);

      // 新增文章和标签关联
      const tags = tag_id.split(',').map(item => +item);
      const tagsql = [];
      tags.forEach(item => {
        tagsql.push(`(${id},${item})`);
      });

      await conn.query('INSERT INTO article_map_tag(aid,tid) VALUES ' + tagsql.join(','));

      await conn.commit(); // 提交事务
      return affectedRows > 0 ? 'success' : 'fail';
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }
  }

  // 文章列表
  async list(current = 1, pageSize = 10, id) {
    const {
      app,
    } = this;
 
    try {
      // 查询个数
      let sql;
      if (id) {
        sql = `SELECT COUNT(id) as count FROM ${this.model} WHERE cid IN (${id})`;
      } else {
        sql = `SELECT COUNT(id) as count FROM ${this.model}`;
      }
      const total = await app.mysql.query(sql);

      const offset = parseInt((current - 1) * pageSize);
      let list;
      if (id) {
        list = await app.mysql.select(`${this.model}`, {
          where: { cid: id },
          columns: ['id', 'title', 'createdAt', 'description', 'pv', 'author', 'status', 'img'],
          orders: [
            ['id', 'desc'],
          ],
          offset,
          limit: parseInt(pageSize),
        });
      } else {
        list = await app.mysql.select(`${this.model}`, {
          columns: ['id', 'title', 'attr', 'pv', 'createdAt', 'status'],
          orders: [
            ['id', 'desc'],
          ],
          offset,
          limit: parseInt(pageSize),
        });
      }

      return {
        count: total[0].count,
        total: Math.ceil(total[0].count / pageSize),
        current: Number(current),
        list,
      };
    } catch (err) {
      console.error(err);
    }
  }

  // 查
  async detail(id) {
    const {
      ctx,
      app,
    } = this;
    try {
      
      // 查询文章
      const data = await app.mysql.get(`${this.model}`, {
        id,
      });
      console.log('id-->',id)
      //兼容mysql错误
      if (!data || !data.cid) {
        console.log(`id->${id} data->${JSON.stringify(data)}`)
        return false;
      }
      // 通过栏目id查找模型id
      const modIdStr = `SELECT mid FROM category WHERE id=${data.cid} LIMIT 0,1`;
      const modId = await app.mysql.query(modIdStr);
      let field = [];
      if (modId.length > 0 && modId[0].mid !== '0') {
        // 通过模型查找表名
        const tableNameStr = `SELECT table_name FROM model WHERE id=${modId[0].mid} LIMIT 0,1`;
        const tableName = await app.mysql.query(tableNameStr);
        // 通过表名查找文章
        const fieldStr = `SELECT * FROM ${tableName[0].table_name} WHERE aid=${id} LIMIT 0,1`;
        field = await app.mysql.query(fieldStr);
      }
      return { ...data, field: field[0] || {} };
    } catch (err) {
      console.error(err);
    }
  }

  // 搜索
  async search(key = '', cur = 1, pageSize = 10, cid = 0) {
    const {
      app,
    } = this;
    // 初始化事务
    
    try {
      // 查询个数
      let sql;
      const countSql = 'SELECT COUNT(*) as count FROM  article a LEFT JOIN category c ON a.cid=c.id';
      const keyStr = ` WHERE a.title LIKE '%${key}%'`;
      const cidStr = `  AND c.id=${+cid}`;

      if (+cid === 0) {
        sql = countSql + keyStr;
      } else {
        sql = countSql + keyStr + cidStr;
      }
      const total = await app.mysql.query(sql);

      // 翻页
      const offset = parseInt((cur - 1) * pageSize);
      let sql_list = '';
      const listStart = `SELECT a.id,a.title,a.attr,a.tag_id,a.description,a.cid,a.pv,a.updatedAt,a.status,c.name,c.path FROM ${this.model} a LEFT JOIN category c ON a.cid=c.id WHERE a.title LIKE '%${key}%' `;
      const listEnd = `ORDER BY a.updatedAt desc LIMIT ${offset},${parseInt(pageSize)}`;
      if (+cid === 0) {
        sql_list = listStart + listEnd;
      } else {
        sql_list = listStart + `AND c.id=${cid} ` + listEnd;
      }
      const list = await app.mysql.query(sql_list);
      return {
        count: total[0].count,
        total: Math.ceil(total[0].count / pageSize),
        current: Number(cur),
        list,
      };
    } catch (err) {
      console.error(err);
    }
  }

  // 增加计数器
  async count(id) {
    const { app } = this;
    try {
      const sql = `UPDATE article SET pv=pv+1 WHERE id=${id} LIMIT 1`;
      const result = await app.mysql.query(sql);
      const affectedRows = result.affectedRows;
      return affectedRows > 0 ? 'success' : 'fail';
    } catch (error) {
      console.error(error)
    }
  }

  // 上一篇文章
  async pre(id, cid) {
    try {
      const { app } = this;
      const sql = `SELECT a.id,a.title,c.name,c.path FROM article a LEFT JOIN category c ON a.cid=c.id  WHERE a.id<${id} AND a.cid=${cid} ORDER BY id DESC LIMIT 1`;
      const result = await app.mysql.query(sql);
      return result[0];
    } catch (error) {
      console.error(error)
    }
  }

  // 下一篇文章
  async next(id, cid) {
    const { app } = this;
    try {

      const sql = `SELECT a.id,a.title,c.name,c.path FROM article a LEFT JOIN category c ON a.cid=c.id WHERE a.id>${id} AND a.cid=${cid} LIMIT 1`;
      const result = await app.mysql.query(sql);
      return result[0];
    } catch (error) {
      console.error(error)
    }
  }

  // 通过栏目id获取mid，通过mid获取模型对应字段
  async findField(cid) {
    const {
      app,
    } = this;
    
    try {
      // 查询个数
      const mid = `SELECT mid FROM category WHERE id=${cid} AND mid IS NOT NULL`;
      const _mid = await app.mysql.query(mid);
      let res = [];
      if (_mid.length > 0) {
        const field = `SELECT field_cname,field_ename,field_type,field_values,field_default,field_sort FROM field WHERE model_id=${_mid[0].mid} LIMIT 0,12`;
        res = await app.mysql.query(field);
      }
      return {
        fields: res,
      };
    } catch (err) {
      console.error(err);
    }
  }

  async tongji() {
    const {
      app,
    } = this;
    try {
      // 昨天
      const yesterdayStr = 'select count(*) AS count from article where TO_DAYS(NOW())-TO_DAYS(updatedAt)<=1';
      const yesterday = await app.mysql.query(yesterdayStr);

      // 今天
      const todayStr = 'select count(*) AS count from article where TO_DAYS(NOW())=TO_DAYS(NOW())';
      const today = await app.mysql.query(todayStr);

      // 7天
      const weekStr = 'SELECT COUNT(*) AS count from article where DATE_SUB(CURDATE(),INTERVAL 7 DAY)<=DATE(updatedAt)';
      const week = await app.mysql.query(weekStr);

      // 30天
      const monthStr = 'SELECT COUNT(*) AS count from article where DATE_SUB(CURDATE(),INTERVAL 30 DAY)<=DATE(updatedAt)';
      const month = await app.mysql.query(monthStr);

      // 季度
      const quarterStr = 'SELECT COUNT(*) AS count from article where QUARTER(createdAt)=QUARTER(NOW())';
      const quarter = await app.mysql.query(quarterStr);

      // 年
      const yearStr = 'SELECT COUNT(*) AS count from article where YEAR(createdAt)=YEAR(NOW())';
      const year = await app.mysql.query(yearStr);

      // 留言数
      const messageStr = 'SELECT COUNT(id) AS count FROM message LIMIT 0,1';
      const message = await app.mysql.query(messageStr);

      return {
        yesterday: yesterday[0].count,
        today: today[0].count,
        week: week[0].count,
        month: month[0].count,
        quarter: quarter[0].count,
        year: year[0].count,
        message: message[0].count,
      };
    } catch (err) {
      console.error(err);
    }
  }

}

module.exports = ArticleService;
