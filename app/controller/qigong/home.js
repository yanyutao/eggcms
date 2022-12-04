'use strict';
const dayjs = require('dayjs');

const Controller = require('egg').Controller;

class HomeController extends Controller {

  // 首页
  async index() {
    try {
      const { app, ctx, service } = this;

      // 广告
      let ad = await service[this.config.template].home.ad(1, 1);
      const obj = {};
      ad.forEach(item => {
        obj[item.mark] = item;
      });
      ad = obj;

      // 轮播
      const _slide = await service[this.config.template].home.getArticleList(3, 0, 5);
      const slide = _slide.list;
      slide.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
      });

      // 顶部头条 1头条
      const _top = await service[this.config.template].home.getArticleList(1, 0, 1);
      const top = _top.list[0];

      // 顶部头条 2-5
      const _topList = await service[this.config.template].home.getArticleList(1, 1, 4);
      const topList = _topList.list;
      topList.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 新闻推荐
      const news_tj = await service[this.config.template].home.getArticleListById(1, 2, 1);
      const news_list = await service[this.config.template].home.getArticleListById(1, '', 5);
      const news = {};
      news.tj = news_tj.list[0];

      news.list = news_list.list;
      news.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 学术交流
      const xueshu = {};
      const xueshu_tj = await service[this.config.template].home.getArticleListById(2, 2, 1);
      const xueshu_list = await service[this.config.template].home.getArticleListById(2, '', 5);
      xueshu.tj = xueshu_tj.list[0];

      xueshu.list = xueshu_list.list;
      xueshu.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 体育气功
      const tiyu = {};
      const tiyu_tj = await service[this.config.template].home.getArticleListById(3, 2, 1);
      const tiyu_list = await service[this.config.template].home.getArticleListById(3, '', 5);
      tiyu.tj = tiyu_tj.list[0];
      tiyu.list = tiyu_list.list;
      tiyu.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 医学气功
      const yixue = {};
      const yixue_tj = await service[this.config.template].home.getArticleListById(4, 2, 1);
      const yixue_list = await service[this.config.template].home.getArticleListById(4, '', 5);
      yixue.tj = yixue_tj.list[0];
      yixue.list = yixue_list.list;
      yixue.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 养生气功
      const ys = {};
      const ys_tj = await service[this.config.template].home.getArticleListById(5, 2, 1);
      const ys_list = await service[this.config.template].home.getArticleListById(5, '', 5);
      ys.tj = ys_tj.list[0];
      ys.list = ys_list.list;
      ys.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 气功医案
      const ya = {};
      const ya_tj = await service[this.config.template].home.getArticleListById(8, 2, 1);
      const ya_list = await service[this.config.template].home.getArticleListById(8, '', 5);
      ya.tj = ya_tj.list[0];
      ya.list = ya_list.list;
      ya.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 气功与书画
      const sh = {};
      const sh_tj = await service[this.config.template].home.getArticleListById(9, 2, 1);
      const sh_list = await service[this.config.template].home.getArticleListById(9, '', 5);
      sh.tj = sh_tj.list[0];
      sh.list = sh_list.list;
      sh.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 气功人物
      const rw = {};
      const rw_tj = await service[this.config.template].home.getArticleListById(10, 2, 1);
      const rw_list = await service[this.config.template].home.getArticleListById(10, '', 5);
      rw.tj = rw_tj.list[0];
      rw.list = rw_list.list;
      rw.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 气功实践
      const sj = {};
      const sj_tj = await service[this.config.template].home.getArticleListById(12, 2, 1);
      const sj_list = await service[this.config.template].home.getArticleListById(12, '', 5);
      sj.tj = sj_tj.list[0];
      sj.list = sj_list.list;
      sj.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 气功纠偏
      const jp = {};
      const jp_tj = await service[this.config.template].home.getArticleListById(13, 2, 1);
      const jp_list = await service[this.config.template].home.getArticleListById(13, '', 5);
      jp.tj = jp_tj.list[0];
      jp.list = jp_list.list;
      jp.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 热门文章
      const _hot = await service[this.config.template].home.getArticlePvList();
      const hot = _hot.list;

      // 李春生文集
      const _chunsheng = await service[this.config.template].home.getArticleListById(32, '', 10);
      const chunsheng = _chunsheng.list;

      // 太极
      const _taiji = await service[this.config.template].home.getArticleListById(6, '', 10);
      const taiji = _taiji.list;

      // 瑜伽
      const _yj = await service[this.config.template].home.getArticleListById(7, '', 10);
      const yujia = _yj.list;

      // 加入缓存？

      await ctx.render(`${this.config.template}/index.html`, { slide, top, topList, ad, news, xueshu, tiyu, yixue, ys, ya, sh, rw, sj, jp, hot, chunsheng, taiji, yujia });

    } catch (error) {
      console.error(error)
    }
  }

  // 列表页
  async list() {
    try {
      const { app, ctx, service } = this;
      const { cate, current, cid } = ctx.params;
      const currentPage = current || 1;
      const pageSize = 10;

      // 当前栏目和当前栏目下所有子导航
      const navSub = ctx.helper.getChildrenId(cate || cid, ctx.app.locals.category);
      const id = cid ? cid : navSub.cate.id;

      if (!id) {
        console.log(`list_id${id}`);
        ctx.redirect('/');
        return;
      }

      // 当前位置
      const position = ctx.helper.treeById(id, ctx.app.locals.category);

      // 广告
      let ad = await service[this.config.template].home.ad(1, 3);
      const obj = {};
      ad.forEach(item => {
        obj[item.mark] = item;
      });
      ad = obj;

      // 文章列表
      const data = await service[this.config.template].home.list(id, currentPage, pageSize);
      data.list.forEach(ele => {
        ele.createdAt = dayjs(ele.createdAt).format('MM-DD');
      });
      // 本类推荐
      const tj = await service[this.config.template].home.getArticleListById(id, 2, 5);

      // 本类热门
      const hot = await service[this.config.template].home.getArticlePvList(id, 10);

      // 本类图文
      const pic = await service[this.config.template].home.getArticleImgList(id, 10);

      await ctx.render(`${this.config.template}/list.html`, { position, list: data, navSub, ad, tj, hot, pic });

    } catch (error) {
      console.error(error);
    }
  }

  // 详情页
  async article() {
    try {
      const { app, ctx, service } = this;

      const id = ctx.params.id.replace('.html', '');
      if (!id) {
        console.log(`no_article_id${id}`);
        ctx.redirect('/');
        return;
      }
      // 文章列表
      const article = await service[this.config.apiService].article.detail(id);
      if (!article) {
        console.log(`no_cid->article_id${id}_article_${JSON.stringify(article)}`);
        ctx.redirect('/');
        return;
      }
      
      // 栏目id
      const cid = article.cid || '';

      article.createdAt = dayjs(article.createdAt).format('YYYY-MM-DD HH:mm:ss');
      article.updatedAt = dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss');

      // 广告
      let ad = await service[this.config.template].home.ad(1, 3);
      if(ad){
        const obj = {};
        ad.forEach(item => {
          obj[item.mark] = item;
        });
        ad = obj;
      }
     


      // 当前栏目和当前栏目下所有子导航
      const navSub = ctx.helper.getChildrenId(cid, ctx.app.locals.category);

      // 当前位置
      const position = ctx.helper.treeById(cid, ctx.app.locals.category);

      // 增加数量
      await service[this.config.apiService].article.count(id);


      // 上一页
      const pre = await service[this.config.apiService].article.pre(id, cid);

      // 下一页
      const next = await service[this.config.apiService].article.next(id, cid);

      // 本类推荐
      const tj = await service[this.config.template].home.getArticleListById(cid, 2, 5);

      // 本类热门
      const hot = await service[this.config.template].home.getArticlePvList(cid, 10);

      // 本类图文
      const pic = await service[this.config.template].home.getArticleImgList(cid, 10);

      await ctx.render(`${this.config.template}/article.html`, { position, navSub, ad, article, pre, next, tj, hot, pic });

    } catch (error) {
      console.error(error);
    }
  }

  // 单页
  async page() {
    try {
      const { app, ctx, service } = this;
      const id = ctx.params.id;

      // 广告
      let ad = await service[this.config.template].home.ad(1, 3);
      const obj = {};
      ad.forEach(item => {
        obj[item.mark] = item;
      });
      ad = obj;

      // 文章列表
      const article = await service[this.config.apiService].page.article(id);

      // 当前栏目和当前栏目下所有子导航
      const navSub = ctx.helper.getChildrenId(article.cid, ctx.app.locals.category);

      // 当前位置
      const position = ctx.helper.treeById(article.cid, ctx.app.locals.category);

      // 点击数量
      await service[this.config.apiService].page.count(id);

      await ctx.render(`${this.config.template}/page.html`, { article, navSub, ad, position });

    } catch (error) {
      console.error(error);
    }
  }

  // 搜索页
  async search() {
    try {
      const { app, ctx, service } = this;
      const page = ctx.params.id || 1;
      const keywords = ctx.params.keywords;
      const pageSize = 10;

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

      await ctx.render(`${this.config.template}/search.html`, { keywords, list, ad });
    } catch (error) {
      console.error(error);
    }
  }


}

module.exports = HomeController;
