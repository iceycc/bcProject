'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// let Constants = require('./constants')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_HOST:'"https://finsuitdev.udomedia.com.cn/PHONE/deal'
})
