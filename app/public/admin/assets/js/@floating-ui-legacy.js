!function(){function t(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,r){if(!t)return;if("string"==typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return e(t,r)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function r(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */r=function(){return t};var t={},e=Object.prototype,o=e.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(S){f=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),a=new j(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=L(a,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=l;var h={};function p(){}function d(){}function y(){}var v={};f(v,a,(function(){return this}));var g=Object.getPrototypeOf,m=g&&g(g(k([])));m&&m!==e&&o.call(m,a)&&(v=m);var w=y.prototype=p.prototype=Object.create(v);function x(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function r(i,a,c,u){var f=s(t[i],t,a);if("throw"!==f.type){var l=f.arg,h=l.value;return h&&"object"==n(h)&&o.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):e.resolve(h).then((function(t){l.value=t,c(l)}),(function(t){return r("throw",t,c,u)}))}u(f.arg)}var i;this._invoke=function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}}function L(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function k(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:P}}function P(){return{value:void 0,done:!0}}return d.prototype=y,f(w,"constructor",y),f(y,"constructor",d),d.displayName=f(y,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,f(t,u,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(b.prototype),f(b.prototype,c,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),f(w,u,"Generator"),f(w,a,(function(){return this})),f(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=k,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function c(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(f){return void r(f)}c.done?e(u):Promise.resolve(u).then(n,o)}function u(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){c(i,n,o,a,u,"next",t)}function u(t){c(i,n,o,a,u,"throw",t)}a(void 0)}))}}System.register([],(function(e,o){"use strict";return{execute:function(){function o(t){return t.split("-")[0]}function c(t){return t.split("-")[1]}function f(t){return["top","bottom"].includes(o(t))?"x":"y"}function l(t){return"y"===t?"height":"width"}function s(t,e,r){var n,i=t.reference,a=t.floating,u=i.x+i.width/2-a.width/2,s=i.y+i.height/2-a.height/2,h=f(e),p=l(h),d=i[p]/2-a[p]/2,y="x"===h;switch(o(e)){case"top":n={x:u,y:i.y-a.height};break;case"bottom":n={x:u,y:i.y+i.height};break;case"right":n={x:i.x+i.width,y:s};break;case"left":n={x:i.x-a.width,y:s};break;default:n={x:i.x,y:i.y}}switch(c(e)){case"start":n[h]-=d*(r&&y?-1:1);break;case"end":n[h]+=d*(r&&y?-1:1)}return n}var h=function(){var t=u(r().mark((function t(e,o,c){var u,f,l,h,p,d,y,v,g,m,w,x,b,L,O,E,j,k,P,S,T,A,R,N,D;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u=c.placement,f=void 0===u?"bottom":u,l=c.strategy,h=void 0===l?"absolute":l,p=c.middleware,d=void 0===p?[]:p,y=c.platform,t.next=3,null==y.isRTL?void 0:y.isRTL(o);case 3:return v=t.sent,t.next=6,y.getElementRects({reference:e,floating:o,strategy:h});case 6:g=t.sent,m=s(g,f,v),w=m.x,x=m.y,b=f,L={},O=0,E=0;case 12:if(!(E<d.length)){t.next=45;break}return j=d[E],k=j.name,P=j.fn,t.next=16,P({x:w,y:x,initialPlacement:f,placement:b,strategy:h,middlewareData:L,rects:g,platform:y,elements:{reference:e,floating:o}});case 16:if(S=t.sent,T=S.x,A=S.y,R=S.data,N=S.reset,w=null!=T?T:w,x=null!=A?A:x,L=i(i({},L),{},a({},k,i(i({},L[k]),R))),!(N&&O<=50)){t.next=42;break}if(O++,"object"!==n(N)){t.next=40;break}if(N.placement&&(b=N.placement),!N.rects){t.next=37;break}if(!0!==N.rects){t.next=35;break}return t.next=32,y.getElementRects({reference:e,floating:o,strategy:h});case 32:t.t0=t.sent,t.next=36;break;case 35:t.t0=N.rects;case 36:g=t.t0;case 37:D=s(g,b,v),w=D.x,x=D.y;case 40:return E=-1,t.abrupt("continue",42);case 42:E++,t.next=12;break;case 45:return t.abrupt("return",{x:w,y:x,placement:b,strategy:h,middlewareData:L});case 46:case"end":return t.stop()}}),t)})));return function(e,r,n){return t.apply(this,arguments)}}();function p(t){return"number"!=typeof t?function(t){return i({top:0,right:0,bottom:0,left:0},t)}(t):{top:t,right:t,bottom:t,left:t}}function d(t){return i(i({},t),{},{top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height})}var y=Math.min,v=Math.max;e("a",(function(t){return{name:"arrow",options:t,fn:function(e){return u(r().mark((function n(){var o,i,u,s,h,d,g,m,w,x,b,L,O,E,j,k,P,S,T,A,R,N,D,_,W,H,C,G,I,M,V;return r().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(s=(u=null!=t?t:{}).element,h=u.padding,d=void 0===h?0:h,g=e.x,m=e.y,w=e.placement,x=e.rects,b=e.platform,null!=s){r.next=4;break}return r.abrupt("return",{});case 4:return L=p(d),O={x:g,y:m},E=f(w),j=c(w),k=l(E),r.next=11,b.getDimensions(s);case 11:return P=r.sent,S="y"===E?"top":"left",T="y"===E?"bottom":"right",A=x.reference[k]+x.reference[E]-O[E]-x.floating[k],R=O[E]-x.reference[E],r.next=18,null==b.getOffsetParent?void 0:b.getOffsetParent(s);case 18:return N=r.sent,0===(D=N?"y"===E?N.clientHeight||0:N.clientWidth||0:0)&&(D=x.floating[k]),_=A/2-R/2,W=L[S],H=D-P[k]-L[T],C=D/2-P[k]/2+_,G=v(W,y(C,H)),I="start"===j?L[S]:L[T],M=I>0&&C!==G&&x.reference[k]<=x.floating[k],V=M?C<W?W-C:H-C:0,r.abrupt("return",(a(i={},E,O[E]-V),a(i,"data",(a(o={},E,G),a(o,"centerOffset",C-G),o)),i));case 30:case"end":return r.stop()}}),n)})))()}}}));function g(t,e){return m.apply(this,arguments)}function m(){return m=u(r().mark((function t(e,n){var a,u,l,s,h,p,d,y,v,g,m,w,x,b;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.placement,u=e.platform,l=e.elements,t.next=3,null==u.isRTL?void 0:u.isRTL(l.floating);case 3:return s=t.sent,h=o(a),p=c(a),d="x"===f(a),y=["left","top"].includes(h)?-1:1,v=s&&d?-1:1,g="function"==typeof n?n(e):n,m="number"==typeof g?{mainAxis:g,crossAxis:0,alignmentAxis:null}:i({mainAxis:0,crossAxis:0,alignmentAxis:null},g),w=m.mainAxis,x=m.crossAxis,b=m.alignmentAxis,p&&"number"==typeof b&&(x="end"===p?-1*b:b),t.abrupt("return",d?{x:x*v,y:w*y}:{x:w*y,y:x*v});case 13:case"end":return t.stop()}}),t)}))),m.apply(this,arguments)}e("o",(function(t){return void 0===t&&(t=0),{name:"offset",options:t,fn:function(e){return u(r().mark((function n(){var o,i,a;return r().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=e.x,i=e.y,r.next=3,g(e,t);case 3:return a=r.sent,r.abrupt("return",{x:o+a.x,y:i+a.y,data:a});case 5:case"end":return r.stop()}}),n)})))()}}}));function w(t){return t&&t.document&&t.location&&t.alert&&t.setInterval}function x(t){if(null==t)return window;if(!w(t)){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function b(t){return x(t).getComputedStyle(t)}function L(t){return w(t)?"":t?(t.nodeName||"").toLowerCase():""}function O(){var t=navigator.userAgentData;return null!=t&&t.brands?t.brands.map((function(t){return t.brand+"/"+t.version})).join(" "):navigator.userAgent}function E(t){return t instanceof x(t).HTMLElement}function j(t){return t instanceof x(t).Element}function k(t){return"undefined"!=typeof ShadowRoot&&(t instanceof x(t).ShadowRoot||t instanceof ShadowRoot)}function P(t){var e=b(t),r=e.overflow,n=e.overflowX,o=e.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function S(t){return["table","td","th"].includes(L(t))}function T(t){var e=/firefox/i.test(O()),r=b(t);return"none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||["transform","perspective"].includes(r.willChange)||e&&"filter"===r.willChange||e&&!!r.filter&&"none"!==r.filter}function A(){return!/^((?!chrome|android).)*safari/i.test(O())}var R=Math.min,N=Math.max,D=Math.round;function _(t,e,r){var n,o,i,a;void 0===e&&(e=!1),void 0===r&&(r=!1);var c=t.getBoundingClientRect(),u=1,f=1;e&&E(t)&&(u=t.offsetWidth>0&&D(c.width)/t.offsetWidth||1,f=t.offsetHeight>0&&D(c.height)/t.offsetHeight||1);var l=j(t)?x(t):window,s=!A()&&r,h=(c.left+(s&&null!=(n=null==(o=l.visualViewport)?void 0:o.offsetLeft)?n:0))/u,p=(c.top+(s&&null!=(i=null==(a=l.visualViewport)?void 0:a.offsetTop)?i:0))/f,d=c.width/u,y=c.height/f;return{width:d,height:y,top:p,right:h+d,bottom:p+y,left:h,x:h,y:p}}function W(t){return(e=t,(e instanceof x(e).Node?t.ownerDocument:t.document)||window.document).documentElement;var e}function H(t){return j(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function C(t){return _(W(t)).left+H(t).scrollLeft}function G(t,e,r){var n=E(e),o=W(e),i=_(t,n&&function(t){var e=_(t);return D(e.width)!==t.offsetWidth||D(e.height)!==t.offsetHeight}(e),"fixed"===r),a={scrollLeft:0,scrollTop:0},c={x:0,y:0};if(n||!n&&"fixed"!==r)if(("body"!==L(e)||P(o))&&(a=H(e)),E(e)){var u=_(e,!0);c.x=u.x+e.clientLeft,c.y=u.y+e.clientTop}else o&&(c.x=C(o));return{x:i.left+a.scrollLeft-c.x,y:i.top+a.scrollTop-c.y,width:i.width,height:i.height}}function I(t){return"html"===L(t)?t:t.assignedSlot||t.parentNode||(k(t)?t.host:null)||W(t)}function M(t){return E(t)&&"fixed"!==b(t).position?function(t){var e=t.offsetParent,r=t,n=!1;for(;r&&r!==e;){var o=r.assignedSlot;if(o){var i=o.offsetParent;if("contents"===b(o).display){var a=o.hasAttribute("style"),c=o.style.display;o.style.display=b(r).display,i=o.offsetParent,o.style.display=c,a||o.removeAttribute("style")}r=o,e!==i&&(e=i,n=!0)}else if(k(r)&&r.host&&n)break;r=k(r)&&r.host||r.parentNode}return e}(t):null}function V(t){for(var e=x(t),r=M(t);r&&S(r)&&"static"===b(r).position;)r=M(r);return r&&("html"===L(r)||"body"===L(r)&&"static"===b(r).position&&!T(r))?e:r||function(t){var e=I(t);for(k(e)&&(e=e.host);E(e)&&!["html","body"].includes(L(e));){if(T(e))return e;var r=e.parentNode;e=k(r)?r.host:r}return null}(t)||e}function F(t){if(E(t))return{width:t.offsetWidth,height:t.offsetHeight};var e=_(t);return{width:e.width,height:e.height}}function Y(t){var e=I(t);return["html","body","#document"].includes(L(e))?t.ownerDocument.body:E(e)&&P(e)?e:Y(e)}function B(t,e){var r;void 0===e&&(e=[]);var n=Y(t),o=n===(null==(r=t.ownerDocument)?void 0:r.body),i=x(n),a=o?[i].concat(i.visualViewport||[],P(n)?n:[]):n,c=e.concat(a);return o?c:c.concat(B(a))}function X(t,e,r){return"viewport"===e?d(function(t,e){var r=x(t),n=W(t),o=r.visualViewport,i=n.clientWidth,a=n.clientHeight,c=0,u=0;if(o){i=o.width,a=o.height;var f=A();(f||!f&&"fixed"===e)&&(c=o.offsetLeft,u=o.offsetTop)}return{width:i,height:a,x:c,y:u}}(t,r)):j(e)?function(t,e){var r=_(t,!1,"fixed"===e),n=r.top+t.clientTop,o=r.left+t.clientLeft;return{top:n,left:o,x:o,y:n,right:o+t.clientWidth,bottom:n+t.clientHeight,width:t.clientWidth,height:t.clientHeight}}(e,r):d(function(t){var e,r=W(t),n=H(t),o=null==(e=t.ownerDocument)?void 0:e.body,i=N(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=N(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-n.scrollLeft+C(t),u=-n.scrollTop;return"rtl"===b(o||r).direction&&(c+=N(r.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:c,y:u}}(W(t)))}function U(t){var e=B(t),r=["absolute","fixed"].includes(b(t).position)&&E(t)?V(t):t;return j(r)?e.filter((function(t){return j(t)&&function(t,e){var r=null==e.getRootNode?void 0:e.getRootNode();if(t.contains(e))return!0;if(r&&k(r)){var n=e;do{if(n&&t===n)return!0;n=n.parentNode||n.host}while(n)}return!1}(t,r)&&"body"!==L(t)})):[]}var $={getClippingRect:function(e){var r=e.element,n=e.boundary,o=e.rootBoundary,i=e.strategy,a="clippingAncestors"===n?U(r):[].concat(n),c=[].concat(t(a),[o]),u=c[0],f=c.reduce((function(t,e){var n=X(r,e,i);return t.top=N(n.top,t.top),t.right=R(n.right,t.right),t.bottom=R(n.bottom,t.bottom),t.left=N(n.left,t.left),t}),X(r,u,i));return{width:f.right-f.left,height:f.bottom-f.top,x:f.left,y:f.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){var e=t.rect,r=t.offsetParent,n=t.strategy,o=E(r),a=W(r);if(r===a)return e;var c={scrollLeft:0,scrollTop:0},u={x:0,y:0};if((o||!o&&"fixed"!==n)&&(("body"!==L(r)||P(a))&&(c=H(r)),E(r))){var f=_(r,!0);u.x=f.x+r.clientLeft,u.y=f.y+r.clientTop}return i(i({},e),{},{x:e.x-c.scrollLeft+u.x,y:e.y-c.scrollTop+u.y})},isElement:j,getDimensions:F,getOffsetParent:V,getDocumentElement:W,getElementRects:function(t){var e=t.reference,r=t.floating,n=t.strategy;return{reference:G(e,V(r),n),floating:i(i({},F(r)),{},{x:0,y:0})}},getClientRects:function(t){return Array.from(t.getClientRects())},isRTL:function(t){return"rtl"===b(t).direction}};e("c",(function(t,e,r){return h(t,e,i({platform:$},r))}))}}}))}();
