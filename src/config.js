/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');

const pro = 'production';
const dev = 'development';
const env = process.env.NODE_ENV || pro;

// 上传文件目录，为 server.js 的所在目录的同级目录 uploads（即根目录下的 uploads）
const uploadDir = path.resolve(path.dirname(process.argv[1]), '../uploads');

if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir);
  } catch (e) {
    throw new Error(
      `no upload directory ${uploadDir}, make it first before start service`,
    );
  }
}

/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

/**
 * 参数说明：
 * nodeHost:
 *   本服务在公网访问的域(hostname + port)
 *   如果端口是80，则不写
 *   如果端口不是80，需要写全
 *
 * nodePort:
 *   node 服务的启动端口
 *
 * javaHost:
 *   java 服务在内网访问的域(hostname + port)
 *   如果端口是80，则不写
 *   如果端口不是80，需要写全
 */
const environment = {
  [dev]: {
    nodeHost: 'zx.youdao.com:3000',
    javaHost: 'qt101x.corp.youdao.com:9999',
  },
  [pro]: {
    nodeHost: 'xinzhixuan.youdao.com',
    nodePort: 5000,
    javaHost: 'noah.youdao.com',
  },
}[env];

const testUsers = {
  kevin: {
    email: 'yodao_kevin@163.com',
    token: '',
    sponsorId: 1,
    pw: '92a35d8b542d4b11a6430f4db05c7e8d',
  },
  s285842: {
    email: '285842@163.com',
    token:
      'eyJhbGciOiJIUzUxMiJ9.eyJjcmVhdGVkIjoxNTE1MDU3NTE2ODI0LCJpZCI6MSwiZXhwIjoxNTE1MDkzNTE2ODI0fQ.U7Abu6RWdW7l4Wf5I_C7SNqpg3_ECZuE_ftAzyglgFICCr025xEgWQZqBAiIPpDzXj3wIOfaYyqikrQT-g0_1g111',
    sponsorId: 285842,
    pw: '2503ee74eb4c784335a0bb81e611ef38',
    note: '首页统计数据账号',
  },
};

module.exports = {
  // Node.js app
  hotPort: 3003,
  port: environment.nodePort,
  nodeHost: environment.nodeHost,
  javaHost: environment.javaHost,

  uploadDir: uploadDir,

  testUser: testUsers.kevin,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://${environment.javaHost}`,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'jwt校验用' },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret:
        process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
    },

    // https://cloud.google.com/console/project
    google: {
      id:
        process.env.GOOGLE_CLIENT_ID ||
        '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret:
        process.env.TWITTER_CONSUMER_SECRET ||
        'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
    },
  },
};
