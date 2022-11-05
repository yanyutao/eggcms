'use strict';
const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write; // 故名思意 异步二进制 写入流
const sendToWormhole = require('stream-wormhole'); // 管道读入一个虫洞。
const dayjs = require('dayjs');
const svgCaptcha = require('svg-captcha');

class BaseController extends Controller {

  get user() {
    return this.ctx.session.user;
  }

  success(res) {
    this.ctx.body = {
      code: 200,
      msg: '成功',
      data: res,
    };
  }

  fail(err) {
    const { msg } = err;
    this.ctx.body = {
      code: 500,
      msg,
      error: err,
    };
	console.error(err);
  }

  // 上传文件
  async uploadFile() {

    const category = this.config.template;

    const stream = await this.ctx.getFileStream();
    // 基础的目录
    const uplaodBasePath = 'app/public/uploads';
    // 生成文件名
    const filename = `${Date.now()}${Number.parseInt(Math.random() * 1000)}${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      }
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
    mkdirsSync(path.join(uplaodBasePath, category, dirname));
    // 生成写入路径
    const target = path.join(uplaodBasePath, category, dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      return { err };
    }
    return {
      link: path.join('/public/uploads', category, dirname, filename),
      fields: stream.fields,
    };
  }

  /* ```
  GET	     /user            ->   app.controllers.user.index
  GET	     /user/new        ->   app.controllers.user.new
  GET	     /user/:id        ->   app.controllers.user.show
  GET	     /user/:id/edit   ->   app.controllers.user.edit
  POST     /user	          ->   app.controllers.user.create
  PUT	     /user/:id	      ->   app.controllers.user.update
  DELETE	 /user/:id	      ->   app.controllers.user.destroy
  ```
  */

  /**
   * @description 查询/分页
   */
  async index() {
    const { ctx, service } = this;
    const { pageNum = 1, pageSize = 5 } = ctx.query;
    const result = await service[this.config.apiService][this.model].list(pageNum, pageSize);
    ctx.body = result;
  }

  /**
   * @description 新增
   */
  async create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const result = await service[this.config.apiService][this.model].create(body);
    ctx.body = result;
  }

  /**
   *@description 更新
   */
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const _parms = { ...ctx.request.body, id };
    const result = await service[this.config.apiService][this.model].update(_parms);
    ctx.body = result;
  }

  /**
   * @description
   */
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const result = await service[this.config.apiService][this.model].destroy(id);
    ctx.body = result;
  }


  // 获取验证码
  async captcha() {
    try {
      const { ctx } = this;
      const captcha = svgCaptcha.create({
        size: 4,
        fontSize: 50,
        width: 100,
        height: 40,
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
        noise: 5,
        // background: '#cc9966',
      });
      ctx.cookies.set('captcha', captcha.text);
      ctx.response.type = 'image/svg+xml'; // 知道你个返回的类型
      ctx.body = captcha.data; // 返回一张图片
    } catch (error) {
      console.error(error);
    }
  }

  // 校验验证码
  async checkCaptcha() {
    const { ctx } = this;
    const { captcha } = ctx.request.body;
    if (ctx.cookies.get('captcha').toLowerCase() === captcha.toLowerCase()) {
      this.success({ data: true });
    } else {
      this.success({ data: false });
    }
  }

}

module.exports = BaseController;
