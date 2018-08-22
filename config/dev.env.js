'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
let Constants = require('./constants')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_HOST: Constants.DEV_HOST,
    Img_SRC:'"https://finsuit-test.oss-cn-beijing.aliyuncs.com/"'
})
