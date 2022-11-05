var $=Object.defineProperty;var c=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var h=(e,a,s)=>a in e?$(e,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[a]=s,k=(e,a)=>{for(var s in a||(a={}))B.call(a,s)&&h(e,s,a[s]);if(c)for(var s of c(a))D.call(a,s)&&h(e,s,a[s]);return e};var f=(e,a,s)=>new Promise((V,_)=>{var u=m=>{try{r(s.next(m))}catch(i){_(i)}},n=m=>{try{r(s.throw(m))}catch(i){_(i)}},r=m=>m.done?V(m.value):Promise.resolve(m.value).then(u,n);r((s=s.apply(e,a)).next())});import{a as N,u as R}from"./ad.js";import{_ as S}from"./index.js";import{a5 as p,o as b,c as g,Y as l,R as t,a as U,W as d}from"./@vue.js";import"./api.js";import"./axios.js";import"./element-plus.js";import"./lodash-es.js";import"./@vueuse.js";import"./@element-plus.js";import"./@popperjs.js";import"./@ctrl.js";import"./dayjs.js";import"./async-validator.js";import"./memoize-one.js";import"./escape-html.js";import"./normalize-wheel-es.js";import"./@floating-ui.js";import"./pinia.js";import"./vue-router.js";import"./js-cookie.js";const q={name:"ad-edit",data:()=>({params:{id:0,title:"",mark:"",imgUrl:"",link:"",platform:"",position:[1,2],createdAt:new Date,updatedAt:new Date,status:"1"},disabled:!1,paramsRules:{title:[{required:!0,message:"\u8BF7\u8F93\u5165\u680F\u76EE\u540D\u79F0",trigger:"blur"},{min:2,max:50,message:"\u540D\u79F0\u957F\u5EA6\u5728 2 \u5230 50 \u4E2A\u5B57\u7B26\u4E4B\u95F4",trigger:"blur"}],mark:[{required:!0,message:"\u8BF7\u8F93\u5165\u680F\u76EE\u540D\u79F0",trigger:"blur"},{min:2,max:50,message:"\u540D\u79F0\u957F\u5EA6\u5728 2 \u5230 50 \u4E2A\u5B57\u7B26\u4E4B\u95F4",trigger:"blur"}]}}),computed:{},mounted(){return f(this,null,function*(){})},created(){return f(this,null,function*(){this.params.id=this.$route.params.id,yield this.detail()})},methods:{detail(){return f(this,null,function*(){try{let e=yield N(this.params.id);if(e.code===200){let a=e.data;a.position=a.position.split(","),a.platform=a.status.toString(),a.status=a.status.toString(),a.updatedAt=new Date(a.createdAt),this.params=a}}catch(e){console.error(e)}})},handleAttr(e){console.log("e-->",e)},handleBox(e){console.log("e-->",e)},upload(e){this.params.imgUrl=e.link},update(){return f(this,null,function*(){try{let e=k({},this.params);e.position=e.position.toString(),(yield R(e)).code&&(this.$message({message:"\u66F4\u65B0\u6210\u529F^_^",type:"success"}),this.$router.go(-1))}catch(e){console.log(e)}})},submit(e){this.$refs[e].validate(a=>{if(a)this.update();else return console.log("error submit!!"),!1})}}},E={class:"mr-10 ml-10 mb-20"},H=d("PC"),P=d("H5"),T=d("\u9996\u9875"),W=d("\u9891\u9053\u9875"),Y=d("\u5217\u8868\u9875"),j=d("\u6587\u7AE0\u9875"),z=d("\u5355\u9875"),F=["src"],G={key:1,class:"el-icon-plus avatar-uploader-icon"},I=U("div",{class:"ml-5 c-666"}," \u66FF\u6362\u56FE\u7247 \uFF08\u6CE8\uFF1A\u56FE\u7247\u94FE\u63A5\u8F93\u5165\u56FE\u7247\u5730\u5740\u4E5F\u53EF\uFF09 ",-1),J=d("\u53D1\u5E03"),K=d("\u4E0D\u53D1\u5E03"),L=d("\u4FDD\u5B58");function M(e,a,s,V,_,u){const n=p("el-input"),r=p("el-form-item"),m=p("el-radio"),i=p("el-checkbox"),y=p("el-checkbox-group"),v=p("el-upload"),w=p("el-date-picker"),A=p("el-button"),C=p("el-form");return b(),g("div",E,[l(C,{ref:"params",model:e.params,rules:e.paramsRules,"label-width":"84px",class:""},{default:t(()=>[U("div",null,[l(r,{label:"\u5E7F\u544A\u540D\u79F0",prop:"title"},{default:t(()=>[l(n,{modelValue:e.params.title,"onUpdate:modelValue":a[0]||(a[0]=o=>e.params.title=o),placeholder:"\u8BF7\u8F93\u5165\u6C49\u5B57"},null,8,["modelValue"])]),_:1}),l(r,{label:"\u5E7F\u544A\u94FE\u63A5"},{default:t(()=>[l(n,{modelValue:e.params.link,"onUpdate:modelValue":a[1]||(a[1]=o=>e.params.link=o)},null,8,["modelValue"])]),_:1}),l(r,{label:"\u5E7F\u544A\u6807\u8BC6",prop:"mark"},{default:t(()=>[l(n,{modelValue:e.params.mark,"onUpdate:modelValue":a[2]||(a[2]=o=>e.params.mark=o),disabled:""},null,8,["modelValue"])]),_:1}),l(r,{label:"\u5E7F\u544A\u5E73\u53F0"},{default:t(()=>[l(m,{modelValue:e.params.platform,"onUpdate:modelValue":a[3]||(a[3]=o=>e.params.platform=o),label:"1"},{default:t(()=>[H]),_:1},8,["modelValue"]),l(m,{modelValue:e.params.platform,"onUpdate:modelValue":a[4]||(a[4]=o=>e.params.platform=o),label:"2"},{default:t(()=>[P]),_:1},8,["modelValue"])]),_:1}),l(r,{label:"\u5E7F\u544A\u4F4D\u7F6E"},{default:t(()=>[l(y,{modelValue:e.params.position,"onUpdate:modelValue":a[5]||(a[5]=o=>e.params.position=o),onChange:u.handleAttr},{default:t(()=>[l(i,{label:"1"},{default:t(()=>[T]),_:1}),l(i,{label:"2"},{default:t(()=>[W]),_:1}),l(i,{label:"3"},{default:t(()=>[Y]),_:1}),l(i,{label:"4"},{default:t(()=>[j]),_:1}),l(i,{label:"5"},{default:t(()=>[z]),_:1})]),_:1},8,["modelValue","onChange"])]),_:1}),l(r,{label:"\u56FE\u7247\u94FE\u63A5"},{default:t(()=>[l(n,{modelValue:e.params.imgUrl,"onUpdate:modelValue":a[6]||(a[6]=o=>e.params.imgUrl=o)},null,8,["modelValue"])]),_:1}),l(r,{label:"\u5E7F\u544A\u56FE\u7247"},{default:t(()=>[l(v,{class:"avatar-uploader",action:"/api/upload","show-file-list":!1,"on-success":u.upload},{default:t(()=>[e.params.imgUrl?(b(),g("img",{key:0,src:e.params.imgUrl,class:"avatar-uploader"},null,8,F)):(b(),g("i",G))]),_:1},8,["on-success"]),I]),_:1}),l(r,{label:"\u53D1\u5E03\u65F6\u95F4"},{default:t(()=>[l(w,{modelValue:e.params.createdAt,"onUpdate:modelValue":a[7]||(a[7]=o=>e.params.createdAt=o),type:"datetime",placeholder:"\u9009\u62E9\u65E5\u671F\u65F6\u95F4"},null,8,["modelValue"])]),_:1}),l(r,{label:"\u662F\u5426\u663E\u793A"},{default:t(()=>[l(m,{modelValue:e.params.status,"onUpdate:modelValue":a[8]||(a[8]=o=>e.params.status=o),label:"1"},{default:t(()=>[J]),_:1},8,["modelValue"]),l(m,{modelValue:e.params.status,"onUpdate:modelValue":a[9]||(a[9]=o=>e.params.status=o),label:"2"},{default:t(()=>[K]),_:1},8,["modelValue"])]),_:1})]),l(r,null,{default:t(()=>[l(A,{type:"primary",onClick:a[10]||(a[10]=o=>u.submit("params"))},{default:t(()=>[L]),_:1})]),_:1})]),_:1},8,["model","rules"])])}const ge=S(q,[["render",M]]);export{ge as default};