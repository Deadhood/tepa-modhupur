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

const extractSass = new ExtractTextPlugin({
  filename: 'bundle.css',
  disable: process.env.NODE_ENV !== 'production'
})

const webpackConfig = {
  entry: ['core-js', SRC_DIR + '/index.js'],
  output: {
    path: OUTPUT_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    noParse: /core-js/,
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
        include: defaultInclude
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
      title: 'Tepa Modhupur'
    }),
    extractSass
  ],
  devtool: 'cheap-inline-source-map',
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
}

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())
  webpackConfig.devtool = undefined
}

module.exports = webpackConfig
