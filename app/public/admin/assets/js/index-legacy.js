!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e=function(){return n};var n={},r=Object.prototype,o=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(O){l=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var o=e&&e.prototype instanceof h?e:h,i=Object.create(o.prototype),a=new S(r||[]);return i._invoke=function(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return k()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var u=b(a,n);if(u){if(u===d)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=m(t,e,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}(t,n,a),i}function m(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(O){return{type:"throw",arg:O}}}n.wrap=f;var d={};function h(){}function s(){}function p(){}var y={};l(y,a,(function(){return this}));var g=Object.getPrototypeOf,v=g&&g(g(_([])));v&&v!==r&&o.call(v,a)&&(y=v);var j=p.prototype=h.prototype=Object.create(y);function w(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function x(e,n){function r(i,a,u,c){var l=m(e[i],e,a);if("throw"!==l.type){var f=l.arg,d=f.value;return d&&"object"==t(d)&&o.call(d,"__await")?n.resolve(d.__await).then((function(t){r("next",t,u,c)}),(function(t){r("throw",t,u,c)})):n.resolve(d).then((function(t){f.value=t,u(f)}),(function(t){return r("throw",t,u,c)}))}c(l.arg)}var i;this._invoke=function(t,e){function o(){return new n((function(n,o){r(t,e,n,o)}))}return i=i?i.then(o,o):o()}}function b(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var r=m(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,d;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function _(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:k}}function k(){return{value:void 0,done:!0}}return s.prototype=p,l(j,"constructor",p),l(p,"constructor",s),s.displayName=l(p,c,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===s||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,l(t,c,"GeneratorFunction")),t.prototype=Object.create(j),t},n.awrap=function(t){return{__await:t}},w(x.prototype),l(x.prototype,u,(function(){return this})),n.AsyncIterator=x,n.async=function(t,e,r,o,i){void 0===i&&(i=Promise);var a=new x(f(t,e,r,o),i);return n.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(j),l(j,c,"Generator"),l(j,a,(function(){return this})),l(j,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},n.values=_,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),c=o.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),E(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;E(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:_(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),d}},n}function n(t,e,n,r,o,i,a){try{var u=t[i](a),c=u.value}catch(l){return void n(l)}u.done?e(c):Promise.resolve(c).then(r,o)}function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var r,o,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(c){u=!0,o=c}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}(t,e)||i(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=i(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return u=t.done,t},e:function(t){c=!0,a=t},f:function(){try{u||null==n.return||n.return()}finally{if(c)throw a}}}}function i(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}System.register(["./@vue-legacy.js","./pinia-legacy.js","./vue-router-legacy.js","./js-cookie-legacy.js","./element-plus-legacy.js","./dayjs-legacy.js","./lodash-es-legacy.js","./@vueuse-legacy.js","./@element-plus-legacy.js","./@popperjs-legacy.js","./@ctrl-legacy.js","./async-validator-legacy.js","./memoize-one-legacy.js","./escape-html-legacy.js","./normalize-wheel-es-legacy.js","./@floating-ui-legacy.js","./axios-legacy.js"],(function(t,i){"use strict";var a,u,c,l,f,m,d,h,s,p,y,g;return{setters:[function(t){a=t.a5,u=t.o,c=t.Q,l=t.R,f=t.U,m=t.as},function(t){d=t.c},function(t){h=t.c,s=t.a},function(t){p=t.a},function(t){y=t.i,g=t.z},function(){},function(){},function(){},function(){},function(){},function(){},function(){},function(){},function(){},function(){},function(){},function(){}],execute:function(){var v=t("_",(function(t,e){var n,i=t.__vccOpts||t,a=o(e);try{for(a.s();!(n=a.n()).done;){var u=r(n.value,2),c=u[0],l=u[1];i[c]=l}}catch(f){a.e(f)}finally{a.f()}return i}))({data:function(){return{}},created:function(){},mounted:function(){},methods:{}},[["render",function(t,e,n,r,o,i){var m=a("router-view");return u(),c(m,null,{default:l((function(t){var e=t.Component;return[(u(),c(f(e)))]})),_:1})}]]),j=function(t,e,n){return t()},w=(t("s",(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"token",e=arguments.length>1?arguments[1]:void 0;p.set(t,e)})),t("g",(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"token";return p.get(t)}))),x=t("a",(function(t){var e,n=o(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;r.label=r.name,r.value=r.id,r.children&&x(r.children)}}catch(i){n.e(i)}finally{n.f()}return t})),b=(t("t",(function(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r];if(n[o.id]=o,0!==o.pid&&n[o.pid]){var i=n[o.pid].children;i&&i.length?i.push(o):n[o.pid].children=[o]}else e.push(o)}return e})),t("b",(function(t,e){var n=[];return function t(e,r){for(var o,i=0;i<r.length;i++)(o=r[i]).id==e&&(n.unshift(o.id),0!=o.pid&&t(o.pid,r))}(t,e),n})),t("c",(function(t){var e=/src=[\'\"]?([^\'\"]*)[\'\"]?/i,n=t.match(/<img.*?(?:>|\/>)/gi),r=[];if(n)for(var o=0;o<n.length;o++){var i=n[o].match(e);i[1]&&r.push(i[1])}return r})),t("f",(function(t){return t.replace(/<[^>]*>/g,"")})),[{path:"/login",name:"login-in",meta:{title:"登录",auth:!1},component:function(){return j((function(){return i.import("./login-legacy.js")}),0,i.meta.url)}},{path:"",name:"home-index",meta:{title:"首页",auth:!1,level:1},redirect:{name:"home-info"},component:function(){return j((function(){return i.import("./Home-legacy.js")}),0,i.meta.url)},children:[{path:"/",name:"home-info",meta:{title:"网站信息",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./info-legacy.js")}),0,i.meta.url)}},{path:"/sys",name:"home-sys",meta:{title:"系统设置",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./sys-legacy.js")}),0,i.meta.url)}},{path:"/category",name:"category-index",meta:{title:"栏目管理",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./index-legacy2.js")}),0,i.meta.url)}},{path:"/category/add",name:"category-add",meta:{title:"新增",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./add-legacy.js")}),0,i.meta.url)}},{path:"/category/edit/:id",name:"category-edit",meta:{title:"更新",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./edit-legacy.js")}),0,i.meta.url)}},{path:"/article",name:"article-index",meta:{title:"文章管理",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./index-legacy3.js")}),0,i.meta.url)}},{path:"/article/add",name:"article-add",meta:{title:"新增",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./add-legacy2.js")}),0,i.meta.url)}},{path:"/article/edit/:id",name:"article-edit",meta:{title:"更新",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./edit-legacy2.js")}),0,i.meta.url)}},{path:"/model",name:"model-index",meta:{title:"模型管理",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./index-legacy4.js")}),0,i.meta.url)}},{path:"/model/add",name:"model-add",meta:{title:"新增",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./add-legacy3.js")}),0,i.meta.url)}},{path:"/model/edit/:id",name:"model-edit",meta:{title:"更新",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./edit-legacy3.js")}),0,i.meta.url)}},{path:"/field",name:"field-index",meta:{title:"字段管理",auth:!1,icon:"",level:3},component:function(){return j((function(){return i.import("./index-legacy5.js")}),0,i.meta.url)}},{path:"/field/add",name:"field-add",meta:{title:"新增",auth:!1,icon:"",level:4},component:function(){return j((function(){return i.import("./add-legacy4.js")}),0,i.meta.url)}},{path:"/field/edit",name:"field-edit",meta:{title:"更新",auth:!1,icon:"",level:4},component:function(){return j((function(){return i.import("./edit-legacy4.js")}),0,i.meta.url)}},{path:"/ad",name:"ad-index",meta:{title:"广告管理",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./index-legacy6.js")}),0,i.meta.url)}},{path:"/ad/add",name:"ad-add",meta:{title:"新增",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./add-legacy5.js")}),0,i.meta.url)}},{path:"/ad/edit/:id",name:"ad-edit",meta:{title:"更新",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./edit-legacy5.js")}),0,i.meta.url)}},{path:"/page",name:"page-index",meta:{title:"页面管理",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./index-legacy7.js")}),0,i.meta.url)}},{path:"/page/add",name:"page-add",meta:{title:"新增",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./add-legacy6.js")}),0,i.meta.url)}},{path:"/page/edit/:id",name:"page-edit",meta:{title:"更新",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./edit-legacy6.js")}),0,i.meta.url)}},{path:"/friendlink",name:"friendlink-index",meta:{title:"友情链接",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./index-legacy8.js")}),0,i.meta.url)}},{path:"/friendlink/add",name:"friendlink-add",meta:{title:"新增",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./add-legacy7.js")}),0,i.meta.url)}},{path:"/friendlink/edit/:id",name:"friendlink-edit",meta:{title:"更新",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./edit-legacy7.js")}),0,i.meta.url)}},{path:"/message",name:"message-index",meta:{title:"消息管理",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./index-legacy9.js")}),0,i.meta.url)}},{path:"/message/add",name:"message-add",meta:{title:"新增",auth:!1,icon:""},component:function(){return j((function(){return i.import("./add-legacy8.js")}),0,i.meta.url)}},{path:"/message/edit/:id",name:"message-edit",meta:{title:"更新",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./edit-legacy8.js")}),0,i.meta.url)}},{path:"/admin",name:"admin-index",meta:{title:"管理员列表",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./index-legacy10.js")}),0,i.meta.url)}},{path:"/admin/add",name:"admin-add",meta:{title:"新增",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./add-legacy9.js")}),0,i.meta.url)}},{path:"/admin/edit/:id",name:"admin-edit",meta:{title:"更新",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./edit-legacy9.js")}),0,i.meta.url)}},{path:"/frag",name:"frag-index",meta:{title:"碎片管理",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./index-legacy11.js")}),0,i.meta.url)}},{path:"/frag/add",name:"frag-add",meta:{title:"新增",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./add-legacy10.js")}),0,i.meta.url)}},{path:"/frag/edit/:id",name:"frag-edit",meta:{title:"更新",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./edit-legacy10.js")}),0,i.meta.url)}},{path:"/tag",name:"tag-index",meta:{title:"标签管理",auth:!1,icon:"",level:1},component:function(){return j((function(){return i.import("./index-legacy12.js")}),0,i.meta.url)}},{path:"/tag/add",name:"tag-add",meta:{title:"新增",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./add-legacy11.js")}),0,i.meta.url)}},{path:"/tag/edit/:id",name:"tag-edit",meta:{title:"更新",auth:!1,icon:"",level:2},component:function(){return j((function(){return i.import("./edit-legacy11.js")}),0,i.meta.url)}}]},{path:"/:pathMatch(.*)*",name:"error",component:function(){return j((function(){return i.import("./404-legacy.js")}),0,i.meta.url)}}]),L=h({history:s(),routes:b});L.beforeEach(function(){var t,r=(t=e().mark((function t(n,r,o){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.meta&&(e=n.meta.title,window.document.title="".concat(e,"-eggcms管理系统")||"eggcms管理系统"),w()?"login-in"===n.name?o({name:"home-index"}):o():"login-in"===n.name?o():o({name:"login-in"});case 3:case"end":return t.stop()}var e}),t)})),function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function u(t){n(a,o,i,u,c,"next",t)}function c(t){n(a,o,i,u,c,"throw",t)}u(void 0)}))});return function(t,e,n){return r.apply(this,arguments)}}());var E=m(v);E.use(d()),E.use(L),E.use(y,{locale:g}),E.mount("#app")}}}))}();