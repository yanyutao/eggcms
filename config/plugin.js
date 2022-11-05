'use strict';
/** @type Egg.EggPlugin */
const plugin = {
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // cors: {
  //   enable: true,
  //   package: 'egg-cors',
  // },
};


module.exports = plugin;
