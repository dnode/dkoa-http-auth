'use strict';

const auth = require('koa-basic-auth');

if (process.env.DHTTP_AUTH_USER && process.env.DHTTP_AUTH_PASSWORD) {
  module.exports = (ctx, next) => {
    try {
      return auth({ name: process.env.DHTTP_AUTH_USER, pass: process.env.DHTTP_AUTH_PASSWORD })(ctx, next);
    } catch (err) {
      if (err.status == 401) {
        ctx.status = 401;
        ctx.set('WWW-Authenticate', 'Basic realm="' + require(process.cwd() + '/package.json').name + '"');
      } else {
        throw err;
      }
    }
  };
} else {
  module.exports = (ctx, next) => { return next(); };
}
