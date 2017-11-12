const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

const EXTENSION_ENV = process.env.EXTENSION_ENV || 'development';

const clean = plugins =>
  plugins.filter(x => !!x);

module.exports = () => ({
  devtool: 'cheap-module-source-map',
  entry: `${__dirname}/index.js`,
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
  },
  performance: false,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['react-css-modules', {
                  generateScopedName: '[local]--[hash:base64:5]',
                }],
              ],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: `${__dirname}/../.eslintrc.js`,
              failOnError: false,
              failOnWarning: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]--[hash:base64:5]',
              sourceMap: false,
              minimize: false,
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: clean([
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash:8].js',
      minChunks: module => (
        module.context &&
        module.context.indexOf('node_modules') !== -1 &&
        module.resource &&
        module.resource.match(/\.js$/)
      ),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: '[name].[chunkhash:8].js',
      minChunks: Infinity,
    }),

    new HtmlPlugin({
      inject: true,
      template: 'index.html',
    }),

    new webpack.DefinePlugin({
      'process.env.EXTENSION_ENV': JSON.stringify(EXTENSION_ENV),
    }),
  ]),
});
