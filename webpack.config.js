const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src')
const OUTPUT_DIR = path.resolve(__dirname, 'dist')

// Any directories you will be adding code/files into,
// need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR]

const isDev = process.env.NODE_ENV !== 'production'

const extractSass = new ExtractTextPlugin({
  filename: 'bundle.css',
  disable: isDev
})

const webpackConfig = {
  entry: ['core-js', SRC_DIR + '/index.js'],
  output: {
    path: OUTPUT_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: defaultInclude
            }
          }]
        }),
        include: defaultInclude
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'buble-loader'
          }
        ],
        include: defaultInclude,
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: 'img/[name].[ext]'
            }
          }
        ],
        include: defaultInclude
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: 'font/[name].[ext]'
            }
          }
        ],
        include: defaultInclude
      }
    ]
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tepa Modhupur',
      template: 'src/_template.ejs'
    }),
    extractSass
  ],
  devtool: 'cheap-inline-source-map',
  stats: 'minimal'
}

if (!isDev) {
  delete webpackConfig.devtool
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = webpackConfig
