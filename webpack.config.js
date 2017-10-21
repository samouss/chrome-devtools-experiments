const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const clean = plugins =>
  plugins.filter(x => !!x);

const JSFilenameIdentifier = '[name].[chunkhash:8].js';

const CSSLoaderLocalIdentifier = isProduction =>
  (!isProduction ? '[local]--[hash:base64:5]' : '[hash:base64]');

const CSSLoaderConfiguration = isProduction => ({
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    localIdentName: CSSLoaderLocalIdentifier(isProduction),
    sourceMap: isProduction,
    minimize: isProduction,
  },
});

module.exports = (options = {}) => {
  const isProduction = !!options.production;

  return {
    devtool: !isProduction ? 'cheap-module-source-map' : 'source-map',
    entry: {
      panel: [
        `${__dirname}/src/polyfills.js`,
        `${__dirname}/src/panel/index.js`,
      ],
      devtools: [
        `${__dirname}/src/polyfills.js`,
        `${__dirname}/src/devtools/index.js`,
      ],
    },
    output: {
      path: `${__dirname}/dist`,
      publicPath: '/',
      filename: JSFilenameIdentifier,
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
    },
    performance: !isProduction ? false : {
      hints: 'warning',
    },
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
                    generateScopedName: CSSLoaderLocalIdentifier(isProduction),
                  }],
                ],
              },
            },
            {
              loader: 'eslint-loader',
              options: {
                configFile: '.eslintrc.js',
                failOnError: isProduction,
                failOnWarning: isProduction,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          loader: !isProduction ? [
            { loader: 'style-loader' },
            CSSLoaderConfiguration(isProduction),
            { loader: 'postcss-loader' },
          ] : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              CSSLoaderConfiguration(isProduction),
              { loader: 'postcss-loader' },
            ],
          }),
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    plugins: clean([
      !isProduction && new WriteFilePlugin(),

      new webpack.optimize.ModuleConcatenationPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: JSFilenameIdentifier,
        minChunks: module => (
          module.context &&
          module.context.indexOf('node_modules') !== -1 &&
          module.resource &&
          module.resource.match(/\.js$/)
        ),
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        filename: JSFilenameIdentifier,
        minChunks: Infinity,
      }),

      new HtmlPlugin({
        inject: true,
        template: 'src/panel/index.html',
        filename: 'panel.html',
        chunks: ['manifest', 'vendor', 'panel'],
      }),

      new HtmlPlugin({
        inject: true,
        template: 'src/devtools/index.html',
        filename: 'devtools.html',
        chunks: ['manifest', 'vendor', 'devtools'],
      }),

      isProduction && new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css',
        allChunks: true,
      }),

      isProduction && new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),

      isProduction && new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ]),
  };
};