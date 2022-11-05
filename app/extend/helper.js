'use strict';
const moment = require('moment');
moment.locale('zh-cn');

const jwt = require('jsonwebtoken');
const fs = require('fs');

// this.ctx.helper.relative  <%=helper.relative(item.time)%>
exports.relative = function(time) {
  return moment(time).fromNow();
};


exports.md5 = str => {
  return require('crypto').createHash('md5').update(str)
    .digest('hex');
};

// 无限极分类tree
exports.tree = arr => {
  const result = [];
  const dataTable = {};
  for (let i = 0; i < arr.length; i++) {
    const d = arr[i];
    dataTable[d.id] = d;
    if (d.pid !== 0 && dataTable[d.pid]) {
      const childrenOfParent = dataTable[d.pid].children;
      if (childrenOfParent && childrenOfParent.length) {
        childrenOfParent.push(d);
      } else {
        dataTable[d.pid].children = [ d ];
      }
    } else {
      result.push(d);
    }
  }
  return result;
};

// 返回id父级所有栏目 位置
exports.treeById = (id, source) => {
  const arr = [];
  const findId = (id, source) => {
    for (let i = 0, item; i < source.length; i++) {
      item = source[i];
      if (item.id == id) {
        arr.unshift(item);
        if (item.pid != 0) {
          findId(item.pid, source);
        }
      }
    }
  };
  findId(id, source);
  const _path = [];
  arr.forEach(item => {
    _path.push('/' + item.pinyin);
    item.path = _path.join('');
  });
  return arr;
};


// 返回
// exports.getChildrenId = (id, source) => {
//   const arr = [];
//   const ids = [];

//   source.forEach(item => {
//     if (item.id == id) {
//       arr.push(item);
//     }
//   });

//   if (arr.length > 0 && arr[0].children) {
//     arr[0].children.forEach(sub => {
//       ids.push(sub.id);
//     });
//   }

//   ids.push(id);
//   return { arr, ids };
// };

// 获取子栏目
exports.getChildrenId = (py, source) => {
  let cate = {};
  let id = '';
  source.forEach(item => {
    if (item.pinyin == py || item.id == py) {
      cate = item;
      id = item.id;
    }
  });
  return { cate, id };
};


// 设置token this.ctx.token this.app.token
exports.setToken = (data, key, time) => {
  const token = jwt.sign(data, key, {
    expiresIn: time,
  });
  return token;
};

// 获取token
exports.getToken = (token, key) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, async (err, decode) => {
      if (err) {
        reject(err);
        console.error(err);
      } else {
        resolve(decode);
      }
    });
  });
};


// 过滤 body标签
exports.filterBody = str => {
  const result = /<body[^>]*>([\s\S]*)<\/body>/.exec(str);
  if (result && result.length === 2) return result[1];
  return str;
};


exports.pc = str => {
  if ((str.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return false;
  }
  return true;
};


// 获取图片
exports.filterImgFromStr = str => {
  const imgReg = /<img.*?(?:>|\/>)/gi; // 匹配出图片img标签
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; // 匹配出图片src属性
  const arr = str.match(imgReg);
  const imgArr = [];
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      const src = arr[i].match(srcReg);
      if (src[1]) {
        imgArr.push(src[1]);
      }
    }
  }
  return imgArr;
};


/**
 * @description 删除上传的图片
 * @param {*} link 字符串
 */
exports.delImg = link => {
  // 判断文件是否存在
  fs.access(link, function(err) {
    if (err) {
      console.error(err);
    } else {
      fs.unlink(link, err => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
};

