const { resolve } = require('path')
const process = require('process')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {VueLoaderPlugin} = require('vue-loader/dist/index')
const TerserPlugin = require('terser-webpack-plugin')

const dev = process.env.NODE_ENV

let config = {
  mode: dev,
  devtool: dev === 'development' ? 'eval-cheap-module-source-map' : false,
  entry: {
    chunks: './src/app.js',
  },

  output: {
    path: resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/[name].[chunkhash].js',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',    
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'file/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          dev === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: '../' },
              },
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            lessOptions: {
              modifyVars: {
              },
              javascriptEnabled: true,
            }
          }
        }]
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(dev),
    }),
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, './dist/index.html'),
      template: './src/index.ejs',
      chunksSortMode: 'none',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      options: {},
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"]
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify/'),
      vm: require.resolve('vm-browserify'),
      fs: require.resolve('fs'),
      assert: require.resolve('assert')

    },
    // 自动补全的扩展名
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      axios: resolve(__dirname, './src/libs/axios'),
      fs:false,
      //crypto: false
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      name: 'vendor',
    },
  },
}

if (dev !== 'development') {
  config.optimization.minimize = true;
  config.optimization.minimizer = [
    new TerserPlugin({
      parallel: true,  //多线程构建
      extractComments: false,
      terserOptions: {
        compress: {
          drop_console: true,
        },
        format: {
          comments: false,
        }
      },
    }),
  ]
  config.plugins.push(
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns:[
        "js",
        "css",
        "file",
        'index.html*'
      ],
      root: resolve(__dirname, './dist'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    })
  )
}
if (dev == 'development') {
  config.output.filename = 'js/[name].[chunkhash].js'
  config.devtool = 'eval-cheap-module-source-map'
  config.devServer = {
    contentBase: resolve(__dirname, './dist'),
    port: 10321,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    progress: true,
    clientLogLevel: 'none',
    open: true, //每次都打开一个网页
    hot: true, //热更新
    inline: true,
    liveReload: true,
    openPage: 'http://127.0.0.1:10321'
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  )
}

module.exports = config
