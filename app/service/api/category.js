'use strict';
const BaseService = require('./base');

class CategoryService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'category';
  }

  // 增
  async create({ pid, seo_title, seo_keywords, seo_description, type,
    name, pinyin, path, description, mid, url, sort, target, status }) {
    const { app } = this;
    try {
      const result = await app.mysql.insert(`${this.model}`, {
        pid, seo_title, seo_keywords, seo_description, type, name, pinyin, path,
        description, mid, url, sort, target, status,
      });
      const affectedRows = result.affectedRows;
      return affectedRows > 0 ? 'success' : 'fail';
    
    } catch (error) {
     console.error(error)
    }
  }

  // 删
  async delete(id) {
    const { app } = this;
    try {
    
      const result = await app.mysql.delete(`${this.model}`, { id });
      const affectedRows = result.affectedRows;
      return affectedRows > 0 ? 'success' : 'fail';
    } catch (error) {
     console.error(error)
    }
  }

  // 改
  async update({ id, pid, seo_title, seo_keywords, seo_description,
    type, name, pinyin, path, description, mid, url, sort, target, status }) {
    const { app } = this;
    try {
    
      const result = await app.mysql.update(`${this.model}`,
      { pid, seo_title, seo_keywords, seo_description,
        type, name, pinyin, path, mid, description, url, sort, target, status },
      {
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

  // 查全部栏目
  async find() {
    const { app } = this;
    try {
    
      const result = await app.mysql.select(`${this.model}`);
      return result;
    } catch (error) {
     console.error(error)
    }
  }

  // 查栏目
  async findId(id) {
    const { app } = this;
    try {
    
      const result = await app.mysql.get(`${this.model}`, { id });
      return result;
    } catch (error) {
     console.error(error)
    }
  }

  // 查子栏目
  async findSubId(id) {
    const { app } = this;
    try {
    
      const result = await app.mysql.select(`${this.model}`, { where: { pid: id } });
      return result;
    } catch (error) {
     console.error(error)
    }
  }

  // 搜索栏目
  async search(key) {
    const { app } = this;
    try {
    
      const sql = `select * from ${this.model} where name like "%${key}%" ORDER BY id,sort`;
      const row = await app.mysql.query(sql);
      return row;
    } catch (error) {
     console.error(error)
    }
  }


}

module.exports = CategoryService;
