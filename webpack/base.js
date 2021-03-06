const path = require('path');
const webpack = require('webpack');
const pathToPhaser = path.join(__dirname, '../node_modules/phaser/');
const phaser = path.join(pathToPhaser, './dist/phaser.js');
const template = path.join(__dirname, '../index.html');
const package = require('../package.json');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  devtool: "eval-source-map",
  entry: './src/game.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        test: /phaser\.js$/,
        loader: 'expose-loader?Phaser',
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|mp3|wav|woff|woff2)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: 'static/assets/[folder]/[name].[contenthash:8].[ext]',
            publicPath: '/'
          },
        }
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      GAME_VERSION: JSON.stringify(package.version),
      GAME_TITLE: JSON.stringify(package.title),
      SKIP_INTRO: process.env.SKIP_INTRO,
    }),
    new HtmlWebpackPlugin({
      template,
      inject: 'head',
      title: package.title
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/images/favicon.png',
      pixel_art: true,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser,
    },
  },
  devServer: {
    contentBase: false
  }
};
