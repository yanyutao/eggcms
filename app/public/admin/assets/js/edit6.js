var f=(e,a,d)=>new Promise((V,g)=>{var i=m=>{try{p(d.next(m))}catch(s){g(s)}},c=m=>{try{p(d.throw(m))}catch(s){g(s)}},p=m=>m.done?V(m.value):Promise.resolve(m.value).then(i,c);p((d=d.apply(e,a)).next())});import{a as N}from"./category.js";import{a as B,u as D}from"./page.js";import{_ as I,b as A,a as v,t as E}from"./index.js";import{B as $}from"./BaseEditor.js";import{a5 as r,o as T,c as q,a as b,Y as t,R as o,F as L,S as _,T as w,W as u}from"./@vue.js";import"./api.js";import"./axios.js";import"./element-plus.js";import"./lodash-es.js";import"./@vueuse.js";import"./@element-plus.js";import"./@popperjs.js";import"./@ctrl.js";import"./dayjs.js";import"./async-validator.js";import"./memoize-one.js";import"./escape-html.js";import"./normalize-wheel-es.js";import"./@floating-ui.js";import"./pinia.js";import"./vue-router.js";import"./js-cookie.js";import"./@wangeditor.js";import"./mitt.js";const O={name:"page-edit",components:{BasicEditor:$},data:()=>({categorySelected:[-1],categoryProps:{checkStrictly:!0},activeName:"first",activeIndex:"0",category:[],cateList:[],autoImg:!0,autoDes:!0,picNum:1,params:{id:0,cid:0,title:"",seo_title:"",seo_keywords:"",seo_description:"",source:"",author:"",createdAt:new Date,updatedAt:new Date,content:"eggcms",status:"0",pv:0},dialogVisible:!1,disabled:!1,paramsRules:{title:[{required:!0,message:"\u8BF7\u8F93\u5165\u680F\u76EE\u540D\u79F0",trigger:"blur"},{min:2,max:50,message:"\u540D\u79F0\u957F\u5EA6\u5728 2 \u5230 50 \u4E2A\u5B57\u7B26\u4E4B\u95F4",trigger:"blur"}]}}),computed:{},unmounted(){},mounted(){},created(){return f(this,null,function*(){this.params.id=this.$route.params.id,yield this.detail(),yield this.query()})},methods:{handleClick(e){this.activeIndex=e.index},setContent(e){this.params.content=e},query(){return f(this,null,function*(){try{let e=yield N();if(e.code===200){let a=e.data,d=A(this.params.cid,a);this.categorySelected=d.length>1?d[0]:d;let V=v(E(a));this.cateList=v(a),this.category=[{label:"\u9876\u7EA7\u680F\u76EE",value:-1},...V]}}catch(e){console.log(e)}})},handleChange(e){e[0]!=-1&&(this.params.cid=e[e.length-1])},detail(){return f(this,null,function*(){try{let e=yield B(this.params.id);e.code===200&&(this.params=e.data,this.params.status=this.params.status.toString(),this.params.updatedAt=new Date(this.params.createdAt))}catch(e){console.error(e)}})},handleAttr(e){console.log("e-->",e)},handleSubCid(e){console.log("e-->",e)},update(){return f(this,null,function*(){try{(yield D(this.params)).code&&(this.$message({message:"\u66F4\u65B0\u6210\u529F^_^",type:"success"}),this.$router.go(-1))}catch(e){console.log(e)}})},submit(e){this.$refs[e].validate(a=>{if(a)console.log(this.params),this.update();else return console.log("error submit!!"),!1})}}},R={class:"mr-10 ml-10"},F={class:"mr-10 ml-10 mb-20"},P=u(" \u63D0\u53D6\u7B2C "),W=u("\u5F20\u56FE\u7247\u4F5C\u5C01\u9762 "),Y=u("\u63D0\u53D6\u6587\u7AE0\u63CF\u8FF0"),j=u("\u53D1\u5E03"),z=u("\u4E0D\u53D1\u5E03"),G=u("\u4FDD\u5B58");function H(e,a,d,V,g,i){const c=r("el-tab-pane"),p=r("el-tabs"),m=r("el-cascader"),s=r("el-form-item"),n=r("el-input"),C=r("BasicEditor"),h=r("el-checkbox"),k=r("el-date-picker"),y=r("el-radio"),U=r("el-button"),S=r("el-form");return T(),q(L,null,[b("div",R,[t(p,{modelValue:e.activeName,"onUpdate:modelValue":a[0]||(a[0]=l=>e.activeName=l),onTabClick:i.handleClick},{default:o(()=>[t(c,{label:"\u57FA\u672C\u4FE1\u606F",name:"first"}),t(c,{label:"\u6269\u5C55\u4FE1\u606F",name:"second"})]),_:1},8,["modelValue","onTabClick"])]),b("div",F,[t(S,{ref:"params",model:e.params,rules:e.paramsRules,"label-width":"84px",class:""},{default:o(()=>[_(b("div",null,[t(s,{label:"\u6587\u7AE0\u680F\u76EE"},{default:o(()=>[t(m,{props:e.categoryProps,"show-all-levels":!1,modelValue:e.categorySelected,"onUpdate:modelValue":a[1]||(a[1]=l=>e.categorySelected=l),options:e.category,onChange:i.handleChange},null,8,["props","modelValue","options","onChange"])]),_:1}),t(s,{label:"\u6587\u7AE0\u6807\u9898",prop:"title"},{default:o(()=>[t(n,{modelValue:e.params.title,"onUpdate:modelValue":a[2]||(a[2]=l=>e.params.title=l)},null,8,["modelValue"])]),_:1}),t(s,{label:"\u6587\u7AE0\u5185\u5BB9"},{default:o(()=>[t(C,{content:e.params.content,onSetContent:i.setContent},null,8,["content","onSetContent"])]),_:1}),t(s,{label:"\u5185\u5BB9\u529F\u80FD"},{default:o(()=>[t(h,{modelValue:e.autoImg,"onUpdate:modelValue":a[4]||(a[4]=l=>e.autoImg=l)},{default:o(()=>[P,t(n,{modelValue:e.picNum,"onUpdate:modelValue":a[3]||(a[3]=l=>e.picNum=l),class:"w-80 mr-8 ml-8",placeholder:"\u8BF7\u8F93\u5165\u5185\u5BB9"},null,8,["modelValue"]),W]),_:1},8,["modelValue"]),t(h,{modelValue:e.autoDes,"onUpdate:modelValue":a[5]||(a[5]=l=>e.autoDes=l)},{default:o(()=>[Y]),_:1},8,["modelValue"])]),_:1}),t(s,{label:"\u53D1\u5E03\u65F6\u95F4"},{default:o(()=>[t(k,{modelValue:e.params.createdAt,"onUpdate:modelValue":a[6]||(a[6]=l=>e.params.createdAt=l),"default-value":new Date,type:"datetime",placeholder:"\u9009\u62E9\u65E5\u671F\u65F6\u95F4"},null,8,["modelValue","default-value"])]),_:1}),t(s,{label:"\u662F\u5426\u663E\u793A"},{default:o(()=>[t(y,{modelValue:e.params.status,"onUpdate:modelValue":a[7]||(a[7]=l=>e.params.status=l),label:"0"},{default:o(()=>[j]),_:1},8,["modelValue"]),t(y,{modelValue:e.params.status,"onUpdate:modelValue":a[8]||(a[8]=l=>e.params.status=l),label:"1"},{default:o(()=>[z]),_:1},8,["modelValue"])]),_:1}),t(s,{label:"\u6D4F\u89C8\u6570"},{default:o(()=>[t(n,{modelValue:e.params.pv,"onUpdate:modelValue":a[9]||(a[9]=l=>e.params.pv=l)},null,8,["modelValue"])]),_:1})],512),[[w,e.activeIndex==0]]),_(b("div",null,[t(s,{label:"SEO\u6807\u9898"},{default:o(()=>[t(n,{modelValue:e.params.seo_title,"onUpdate:modelValue":a[10]||(a[10]=l=>e.params.seo_title=l)},null,8,["modelValue"])]),_:1}),t(s,{label:"SEO\u5173\u952E\u8BCD"},{default:o(()=>[t(n,{modelValue:e.params.seo_keywords,"onUpdate:modelValue":a[11]||(a[11]=l=>e.params.seo_keywords=l)},null,8,["modelValue"])]),_:1}),t(s,{label:"SEO\u63CF\u8FF0"},{default:o(()=>[t(n,{modelValue:e.params.seo_description,"onUpdate:modelValue":a[12]||(a[12]=l=>e.params.seo_description=l)},null,8,["modelValue"])]),_:1}),t(s,{label:"\u6765\u6E90"},{default:o(()=>[t(n,{modelValue:e.params.source,"onUpdate:modelValue":a[13]||(a[13]=l=>e.params.source=l)},null,8,["modelValue"])]),_:1}),t(s,{label:"\u4F5C\u8005"},{default:o(()=>[t(n,{modelValue:e.params.author,"onUpdate:modelValue":a[14]||(a[14]=l=>e.params.author=l)},null,8,["modelValue"])]),_:1})],512),[[w,e.activeIndex==1]]),t(s,null,{default:o(()=>[t(U,{type:"primary",onClick:a[15]||(a[15]=l=>i.submit("params"))},{default:o(()=>[G]),_:1})]),_:1})]),_:1},8,["model","rules"])])],64)}const he=I(O,[["render",H]]);export{he as default};