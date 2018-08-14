var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var env = process.env.NODE_ENV

var publicPathDev = (env === 'development' && config.dev.assetsPublicPath)
var publicPathProd4dev = (env === 'prod4dev' && config.build4dev.assetsPublicPath)
var publicPathProd4test = (env === 'prod4test' && config.build4test.assetsPublicPath)
var publicPathProd = (env === 'production' && config.build.assetsPublicPath)
var publicPath = publicPathDev || publicPathProd4dev || publicPathProd4test || publicPathProd

var assetsRootDev = (env === 'development' && config.build.assetsRoot)
var assetsRootProd4dev = (env === 'prod4dev' && config.build4dev.assetsRoot)
var assetsRootProd4test = (env === 'prod4test' && config.build4test.assetsRoot)
var assetsRootProd = (env === 'production' && config.build.assetsRoot)
var assetsRoot = assetsRootDev || assetsRootProd4dev || assetsRootProd4test || assetsRootProd

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  externals: {
    'vue': 'window.Vue',
    'vuex': 'window.Vuex',
    'axios': 'axios'
  },
  output: {
    path: assetsRoot,
    filename: '[name].js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
      '@router': resolve('src/router'),
      '@store': resolve('src/store'),
      '@views': resolve('src/views'),
      '@common': resolve('src/common'),
      '@service': resolve('src/service'),
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  }
}
