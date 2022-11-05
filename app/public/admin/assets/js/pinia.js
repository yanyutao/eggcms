import{ao as r,d as l,an as p}from"./@vue.js";var u=!1;/*!
  * pinia v2.0.22
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const f=Symbol();var s;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(s||(s={}));function _(){const t=r(!0),o=t.run(()=>l({}));let c=[],n=[];const a=p({install(e){a._a=e,e.provide(f,a),e.config.globalProperties.$pinia=a,n.forEach(i=>c.push(i)),n=[]},use(e){return!this._a&&!u?n.push(e):c.push(e),this},_p:c,_a:null,_e:t,_s:new Map,state:o});return a}export{_ as c};
