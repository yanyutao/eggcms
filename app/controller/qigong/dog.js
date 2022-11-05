'use strict';
const dayjs = require('dayjs');
const Controller = require('egg').Controller;

class HomeController extends Controller {

  // 首页
  async index() {
    const { app, ctx, service } = this;

    // 广告
    let ad = await service[this.config.template].home.ad(1, 1);
    const obj = {};
    ad.forEach(item => {
      obj[item.mark] = item;
    });
    ad = obj;

    // 轮播
    const swiper = await service[this.config.template].home.swiper();
    swiper.forEach(ele => {
      ele.img = ele.img ? ele.img.replace('../', '/public/') : ele.img;
    });

    // 新闻推荐
    const news = await service[this.config.template].home.list(2, 1, 3);
    news.list.forEach(item => {
      item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
    });
    const _new = await service[this.config.template].home.list(2, 3, 3);
    _new.list.forEach(item => {
      item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
    });
    news.new = _new.list;

    // 健康健美长寿论坛
    const forum = await service[this.config.template].home.list(3, 0, 8);
    forum.list.forEach(item => {
      item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
      item.img = item.img ? item.img.replace('../', '/public/') : item.img;
    });

    // 大健康运动会
    const sports = await service[this.config.template].home.list(4, 2, 24);
    sports.list.forEach(item => {
      item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
      item.img = item.img ? item.img.replace('../', '/public/') : item.img;
    });

    // 健康产业博览会
    const fair = await service[this.config.template].home.list(5);
    fair.list.forEach(item => {
      item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
    });

    // 学术论文
    const learning = await service[this.config.template].home.list(12, 0, 8);
    learning.list.forEach(item => {
      item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
    });

    await ctx.render(`${this.config.template}/index.html`, { ad, swiper, news, forum, sports, fair, learning });
  }

  // 列表页
  async list() {
    try {
      const { app, ctx, service } = this;
      const page = ctx.query.page || 1;
      const id = ctx.params.id;
      const pageSize = 10;

      // 站点
      const site = await service[this.config.apiService].site.find();

      // 导航
      const navSub = this.ctx.helper.getChildrenId(id, ctx.state.category);

      // 当前位置
      const position = this.ctx.helper.treeById(id, ctx.state.category);

      // 大健康运动会
      const sports = await service[this.config.template].home.list(4, 1);
      sports.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
      });

      // 广告
      let ad = await service[this.config.template].home.ad(1, 3);
      const obj = {};
      ad.forEach(item => {
        obj[item.mark] = item;
      });
      ad = obj;

      // 文章列表
      const ids = navSub.ids.join(',');
      const data = await service[this.config.apiService].article.list(page, pageSize, ids);

      data.list.forEach(ele => {
        ele.createdAt = dayjs(ele.createdAt).format('YYYY-MM-DD HH:mm:ss');
        ele.img = ele.img ? ele.img.replace('../', '/public/') : ele.img;
      });

      await ctx.render(`${this.config.template}/list.html`, { site, list: data, navSub: navSub.arr, ad, sports, position });
    } catch (error) {
      console.log(error);
    }
  }

  // 详情页
  async article() {
    try {
      const { app, ctx, service } = this;

      const id = ctx.params.id;
      const pageSize = 10;


      // 大健康运动会
      const sports = await service[this.config.template].home.list(4, 1);
      sports.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
      });

      // 广告
      let ad = await service[this.config.template].home.ad(1, 3);
      const obj = {};
      ad.forEach(item => {
        obj[item.mark] = item;
      });
      ad = obj;

      // 文章列表
      const article = await service[this.config.apiService].article.detail(id);
      article.createdAt = dayjs(article.createdAt).format('YYYY-MM-DD HH:mm:ss');
      article.updatedAt = dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      article.content = article.content.replace(/\.\.\//g, '/public/');

      // 子栏目
      const navSub = this.ctx.helper.getChildrenId(article.cid, ctx.state.category);
      // 当前位置
      const position = this.ctx.helper.treeById(article.cid, ctx.state.category);

      // 点击数量
      await service[this.config.apiService].article.count(id);
      // 上一页
      const pre = await service[this.config.apiService].article.pre(article.cid);
      // 下一页
      const next = await service[this.config.apiService].article.next(article.cid);

      await ctx.render(`${this.config.template}/article.html`, { article, navSub: navSub.arr, ad, sports, position, pre, next });
    } catch (error) {
      console.log(error);
    }
  }

  // 单页
  async page() {
    try {
      const { app, ctx, service } = this;
      const id = ctx.params.id;

      // 大健康运动会
      const sports = await service[this.config.template].home.list(4, 1);
      sports.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
      });

      // 广告
      let ad = await service[this.config.template].home.ad(1, 3);
      const obj = {};
      ad.forEach(item => {
        obj[item.mark] = item;
      });
      ad = obj;

      // 文章列表
      const article = await service[this.config.apiService].page.article(id);
      article.createdAt = dayjs(article.createdAt).format('YYYY-MM-DD HH:mm:ss');
      article.updatedAt = dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      article.content = article.content.replace(/\.\.\//g, '/public/');

      // 子栏目
      const navSub = this.ctx.helper.getChildrenId(article.cid, ctx.state.category);

      // 当前位置
      const position = this.ctx.helper.treeById(article.cid, ctx.state.category);

      // 点击数量
      await service[this.config.apiService].page.count(id);

      await ctx.render(`${this.config.template}/page.html`, { article, navSub: navSub.arr, ad, sports, position });

    } catch (error) {
      console.log(error);
    }
  }

  // 搜索页
  async search() {
    try {
      const { app, ctx, service } = this;
      const page = ctx.query.page || 1;
      const keywords = ctx.query.keywords;
      const pageSize = 10;

      const site = await service[this.config.apiService].site.find();

      // 导航
      const category = await service[this.config.template].home.category();
      const nav = this.ctx.helper.tree(category);

      // 大健康运动会
      const sports = await service[this.config.template].home.list(4, 1);
      sports.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
      });

      // 广告
      let ad = await service[this.config.template].home.ad(1, 3);
      const obj = {};
      ad.forEach(item => {
        obj[item.mark] = item;
      });
      ad = obj;
      // 文章列表

      const list = await service[this.config.apiService].article.search(keywords, page, pageSize);
      list.list.forEach(ele => {
        ele.updatedAt = dayjs(ele.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      });

      await ctx.render(`${this.config.template}/search.html`, { site, keywords, list, nav,
        ad, sports });
    } catch (error) {
      console.log(error);
    }
  }


}

module.exports = HomeController;
