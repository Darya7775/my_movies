/*global require, module, __dirname, process*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: { main: path.resolve(__dirname, './src/index.tsx') },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: production ? '[name].[contenthash].js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.cmp.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      base: '/'
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  mode: production ? 'production' : 'development'
};
