'use strict';
const BaseService = require('./base');

class SiteService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'site';
  }

  // 基本信息
  async find() {
    const { app } = this;
    const result = await app.mysql.get(`${this.model}`);
    return result;
  }


  // 更新基本信息
  async updateInfo({ id, name, domain, email, icp, code }) {
    const { app } = this;
    let result;
    if (id) {
      result = await app.mysql.update(`${this.model}`,
        { name, domain, email, icp, code },
        {
          where: {
            id,
          },
        });
    } else {
      result = await app.mysql.insert(`${this.model}`, { name, domain, email, icp, code });
    }

    const affectedRows = result.affectedRows;
    return affectedRows > 0 ? 'success' : 'fail';
  }

  // 更新seo
  async updateSeo({ id, title, keywords, description }) {
    const { app } = this;
    let result;
    if (id) {
      result = await app.mysql.update(`${this.model}`,
        { title, keywords, description },
        {
          where: {
            id,
          },
        });
    } else {
      result = await app.mysql.insert(`${this.model}`, { title, keywords, description });
    }
    const affectedRows = result.affectedRows;
    return affectedRows > 0 ? 'success' : 'fail';
  }

}

module.exports = SiteService;
