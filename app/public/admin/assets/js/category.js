import{h as e,a}from"./api.js";let d=()=>e({url:`${a.API_URL}/api/category/find`,method:"get"}),u=t=>e({url:`${a.API_URL}/api/auth/category/create`,method:"post",data:t}),o=t=>e({url:`${a.API_URL}/api/category/findId?id=${t}`,method:"get"}),i=t=>e({url:`${a.API_URL}/api/category/findSubId?id=${t}`,method:"get"}),l=t=>e({url:`${a.API_URL}/api/auth/category/update`,method:"post",data:t}),p=t=>e({url:`${a.API_URL}/api/auth/category/delete?id=${t}`,method:"get"}),s=t=>e({url:`${a.API_URL}/api/category/search?q=${t}`,method:"get"});export{d as a,o as b,u as c,p as d,i as f,s,l as u};