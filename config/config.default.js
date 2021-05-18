/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.cluster = {
    listen: {
      port: 7003
    }
  }

  //关闭csrf  https://www.jianshu.com/p/4f6a27cb693c
  config.security = {
    csrf: { enable: false }
  }

  config.mysql = {
    client: {
      host: '39.100.65.255',
      // host: '127.0.0.1',
      // host: '47.93.230.161',
      port: '3306',
      user: 'building_user',
      // user: 'root',
      password: 'building123',
      // password: 'yue825822',
      database: 'building',
      // database: 'building'
    },
    app: true,
    agent: false,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1603354811324_8655';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
