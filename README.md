# eggcms系统介绍
------
 **eggcms**内容管理系统，是基于egg.js mysql vue3 进行开发的一套实用轻量cms系统。常用企业网站，图片网站，新闻资讯，软件下载网站，博客，文章等诸多类型网站开发，也适用于前端二次开发。


## 软件架构
------
后台管理client技术栈
  > * vue3 
  > * vue-router
  > * pina 
  > * element-plus 
  > * vite2
  > * wangEditor5

服务端技术栈
  > * node v16.15.1
  > * eggjs 2+
  > * mysql 5.7
  > * pm2 5.2.2
  > * ejs

## 功能介绍
------
> * 站点信息
> * 管理员登模块
> * 无限极栏目分类
> * 文章模块
> * 单页模块
> * 扩展模型（通过模型扩展，可进行多领域网站开发）
> * 标签管理
> * 碎片管理
> * 广告模块
> * 友情链接模块
> * 在线留言模块


## 本地开发运行
------
* 1 下载phpStudy软件，
    启动mysql和nginx,安装phpMyadmin数据库web管理工具;
* 2 用phpMyadmin新建数据库，
    导入
    ```
    eggcms.sql(back文件夹里面)
    ```
    修改数据库配置文件，模板配置 
    ```
    server/config/config.default.js
    ```
* 3 进入server 文件夹
    设置npm源安装依赖
    ```
    npm config set registry https://registry.npmmirror.com
    npm i 
    npm run dev 
    ```
    后访问 http://localhost:81 ，完成网站启动。

*  4.后台管理界面  
   ```
    http://localhost:81/public/admin/index.html 
    ```
   默认账号密码：**eggcms**  **123456**




## linux服务器部署
------
* 1 安装BT运维管理工具
* 2 安装 nginx mysql5.6  pm2管理器 
* 3 创建mysql，导入本地数据库，修改数据库配置文件
* 4 创建网站,绑定域名和设置反向代理,上传代码,
    ```
    npm i ,npm run start启动即可。
    ```
  eggjs自带的不会重启，建议使用pm2部署。
* 5 安装pm2 ,执行npm run app 靠谱启动。支持pm2单进程启动，低内存运行。
* 6 配置https


### 基于eggcms开发的站点
------
> * [世界气功网](http://www.shijieqigong.com/)

> * [世界大健康运动联盟](http://www.worldhealthgames.com/)


### 关注项目
------
> * [github地址]（https://github.com/yanyutao/eggcms） 
> * [gitee地址]（https://gitee.com/yanyutao0402/eggcms）



