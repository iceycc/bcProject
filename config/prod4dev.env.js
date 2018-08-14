var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

/**
 * 环境配置【服务器开发环境】
 */
module.exports = merge(prodEnv, {
  NODE_ENV: '"prod4dev"',
  HOST_IP: '"https://adv.udomedia.com.cn"'
})
