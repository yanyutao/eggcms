'use strict';
const jwt = require('jsonwebtoken');

module.exports = {

  // 生成加密token
  setToken(data) {
    // this.ctx.token this.app.token
    return jwt.sign({ username: data.username, uid: data.id },
      this.config.token.KEY, { expiresIn: this.config.token.TIME });
  },

  // 解密token
  getToken(token) {
    jwt.verify(token, this.config.token.KEY, async (error, decode) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return 'TokenExpiredError';
        }
        console.error(error);
        return false;
      }
      return decode;
    });
  },


};
