'use strict';
const BaseService = require('./base');

class HomeService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'home';
  }

  // 网站栏目
  async category() {
    const {
      app,
    } = this;
    // 初始化事务
    const conn = await app.mysql.beginTransaction();
    try {
      const navStr = 'SELECT id,pid,name,pinyin,path,sort,target,status,type FROM category';
      const nav = await conn.query(navStr);
      // 提交事务
      await conn.commit();
      return nav;
    } catch (err) {
      console.error(err);
      await conn.rollback();
      throw err;
    }

  }

  // 广告
  async ad(platform = 1, position = 1) {
    const {
      app,
    } = this;
    // 初始化事务
    const conn = await app.mysql.beginTransaction();
    try {
      const adStr = `SELECT id,title,mark,imgUrl,link FROM ad WHERE platform=${platform} AND position=${position} AND status=1`;
      const ad = await conn.query(adStr);
      // 提交事务
      await conn.commit();
      return ad;
    } catch (err) {
      console.error(`platform-> ${platform} position->${position}`, err);
      await conn.rollback();
      throw err;
    }

  }

  //  指定栏目和文章 1头条 2推荐-右侧 3轮播 4热门事件
  async getArticleListById(id, attr, len = 5) {
    const {
      app,
    } = this;
    // 初始化事务
    const conn = await app.mysql.beginTransaction();
    try {

      // 获取所有id
      const res = await conn.query('SELECT id FROM category WHERE pid=?', [id]);
      let ids = [id];
      res.forEach(item => {
        ids.push(item.id);
      });
      ids = ids.join(',');

      // 获取栏目
      let sql,
        result;
      if (attr) {
        sql = `SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id WHERE a.cid IN (?)  AND a.attr LIKE \'%?%\'  ORDER BY createdAt DESC LIMIT 0,${len}`;
        result = await this.app.mysql.query(sql, [ids, +attr]);
      } else {
        sql = `SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id WHERE a.cid IN (?) ORDER BY createdAt DESC LIMIT 0,${len}`;
        result = await this.app.mysql.query(sql, [ids]);
      }
      // 提交事务
      await conn.commit();
      return { list: result };
    } catch (err) {
      console.error(`id->${id} attr-> ${attr} len->${len}`, err);
      await conn.rollback();
      throw err;
    }
  }

  // 全局文章  1头条 2推荐-右侧 3轮播 4热门事件
  async getArticleList(attr, start = 0, len = 5) {
    const {
      app,
    } = this;
    // 初始化事务
    const conn = await app.mysql.beginTransaction();
    try {
      let sql,
        result;
      if (attr) {
        sql = `SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id WHERE a.attr LIKE \'%?%\'  ORDER BY createdAt DESC LIMIT ${start},${len}`;
        result = await this.app.mysql.query(sql, [+attr]);
      } else {
        sql = `SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id  ORDER BY createdAt DESC LIMIT ${start},${len}`;
        result = await this.app.mysql.query(sql, []);
      }
      // 提交事务
      await conn.commit();
      return { list: result };
    } catch (err) {
      console.error(`attr-> ${attr} start->${start} len->${len}`, err);
      await conn.rollback();
      throw err;
    }
  }

  // 指定栏目或全局本月浏览pv排行
  // async getArticleMonthPvSort(id = '', len = 10) {
  //   const {
  //     app,
  //   } = this;
  //   // 初始化事务
  //   const conn = await app.mysql.beginTransaction();
  //   try {

  //     // 获取所有id
  //     const res = await conn.query('SELECT id FROM category WHERE pid=?', [ id ]);
  //     let ids = [ id ];
  //     res.forEach(item => {
  //       ids.push(item.id);
  //     });
  //     ids = ids.join(',');

  //     let sql,
  //       result;
  //     if (id) {
  //       sql = `SELECT id,title,short_title,img,description,createdAt from article WHERE cid IN (?) AND DATE_FORMAT(createdAt,'%Y%m')=DATE_FORMAT(CURDATE(),'%Y%m') ORDER BY pv DESC LIMIT 0,${len}`;
  //       result = await this.app.mysql.query(sql, [ ids ]);
  //     } else {
  //       sql = `SELECT id,title,short_title,img,description,createdAt from article WHERE DATE_FORMAT(createdAt,'%Y%m')=DATE_FORMAT(CURDATE(),'%Y%m') ORDER BY pv DESC LIMIT 0,${len}`;
  //       result = await this.app.mysql.query(sql, []);
  //     }

  //     // 提交事务
  //     await conn.commit();
  //     return { list: result };
  //   } catch (err) {
  //     // 异常后回滚
  //      await conn.rollback(); 
  //     console.error(err);
  //   }
  // }

  // 指定栏目或全局 浏览pv排行
  async getArticlePvList(id = '', len = 10) {
    const {
      app,
    } = this;
    // 初始化事务
    const conn = await app.mysql.beginTransaction();
    try {
      let sql,
        result;
      // 获取所有id
      if (id) {
        const res = await conn.query('SELECT id FROM category WHERE pid=?', [id]);
        let ids = [id];
        res.forEach(item => {
          ids.push(item.id);
        });
        ids = ids.join(',');
        sql = `SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id WHERE cid IN (?)  ORDER BY pv DESC LIMIT 0,${len}`;
        result = await this.app.mysql.query(sql, [ids]);
      } else {
        sql = `SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id ORDER BY pv DESC LIMIT 0,${len}`;
        result = await this.app.mysql.query(sql, []);
      }
      // 提交事务
      await conn.commit();
      return { list: result };
    } catch (err) {
      console.error(`id->${id} len->${len}`, err);
      // 异常后回滚
      await conn.rollback();
      throw err;
    }
  }


  // 指定栏目或全局 图文排行榜 ?没测过
  async getArticleImgList(id = '', len = 10) {
    const {
      app,
    } = this;
    // 初始化事务
    const conn = await app.mysql.beginTransaction();
    try {
      // 获取所有id
      const res = await conn.query('SELECT id FROM category WHERE pid=?', [id]);
      if (!res) {
        console.log(`getArticleImgList-id->${id}-len->${len}`)
        return { list: [] };
      }

      let ids = [id];
      if (res) {
        res.forEach(item => {
          item.id && ids.push(item.id);
        });
      }

      ids = ids.join(',');

      let sql,
        result;
      if (id) {
        sql = `SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id  WHERE a.img!='' AND a.cid IN (?) ORDER BY createdAt DESC LIMIT 0,${len}`;
        result = await this.app.mysql.query(sql, [ids]);
      } else {
        sql = `SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id  WHERE img!='' ORDER BY createdAt DESC LIMIT 0,${len}`;
        result = await this.app.mysql.query(sql, []);
      }

      // 提交事务
      await conn.commit();
      return { list: result };
    } catch (err) {
      console.error(`id->${id} len->${len}`, err);
      // 异常后回滚
      await conn.rollback();
      throw err;

    }
  }


  async list(id, current, pageSize) {
    const {
      app,
    } = this;
    // 初始化事务
    const conn = await app.mysql.beginTransaction();
    try {
      let ids = [];
      const start = parseInt((current - 1) * pageSize);
      // 获取所有id
      if (id) {
        const res = await conn.query('SELECT id FROM category WHERE pid=?', [id]);
        ids = [id];
        res.forEach(item => {
          ids.push(item.id);
        });
        ids = ids.join(',');
      }

      // 查询个数
      let sql1,
        sql2;
      if (ids.length > 0) {
        sql1 = `SELECT COUNT(id) as count FROM article WHERE cid IN (${ids})`;
        sql2 = `SELECT a.id,a.title,a.short_title,a.img,a.description,a.createdAt,a.author,a.pv,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id WHERE a.cid IN (${ids}) ORDER BY createdAt DESC LIMIT ${start},${pageSize}`;
      } else {
        sql1 = 'SELECT COUNT(id) as count FROM article';
        sql2 = `SELECT a.id,a.title,a.short_title,a.img,a.description,a.createdAt,a.author,a.pv,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id ORDER BY createdAt DESC LIMIT ${start},${pageSize}`;
      }
      const total = await conn.query(sql1);
      const result = await conn.query(sql2, []);
      const count = total[0].count || 1;
      // 提交事务
      await conn.commit(); // 提交事务
      return {
        count,
        total: Math.ceil(count / pageSize),
        current: +current,
        list: result,
      };
    } catch (err) {
      console.error(`id->${id} current->${current} pageSize->${pageSize}`, err);
      // 异常后回滚
      await conn.rollback();
      throw err;
    }
  }
}

module.exports = HomeService;
